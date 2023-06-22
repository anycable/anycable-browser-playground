(function () {
  // Logger setup
  var logsContainer = document.getElementById("logs");

  LEVEL_TO_NAME = {
    user: -1,
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  LEVEL_TO_COLOR = {
    user: "purple-500",
    debug: "gray-500",
    info: "blue-700",
    warn: "orange-700",
    error: "red-700",
  };

  var autoscroll = document.getElementById("autoscroll");

  function log(level, message, details) {
    if (LEVEL_TO_NAME[level] < LEVEL_TO_NAME[this.level]) return;

    var item = document.createElement("p");
    item.classList.add("text-" + LEVEL_TO_COLOR[level]);
    item.textContent =
      level.charAt(0).toUpperCase() +
      " [" +
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      }) +
      "] " +
      message;
    logsContainer.appendChild(item);

    if (details) {
      var detailsItem = document.createElement("p");
      detailsItem.classList.add("text-" + LEVEL_TO_COLOR[level]);
      detailsItem.textContent = "\r  ↪ " + JSON.stringify(details);
      logsContainer.appendChild(detailsItem);
    }

    if (autoscroll.checked) {
      logsContainer.scrollTop = logsContainer.scrollHeight;
    }
  }

  var logger = {
    level: "debug",
    info: function (message, details) {
      this.log("info", message, details);
    },
    warn: function (message, details) {
      this.log("warn", message, details);
    },
    error: function (message, details) {
      this.log("error", message, details);
    },
    debug: function (message, details) {
      this.log("debug", message, details);
    },
  };

  logger.log = log.bind(logger);

  // ActionCable setup

  var cable = null;
  var channel = null;
  var url = "ws://localhost:8080/cable";

  var options = {
    logLevel: "debug",
    logger: logger,
  };

  function connect() {
    if (cable) return;

    logger.level = options.logLevel;
    cable = AnyCable.createCable(url, options);
    channel = cable.subscribeTo("BenchmarkChannel");
    channel.on("message", function (data) {
      log("user", "Message received", data);
    });
  }

  function echo(content) {
    if (!channel) return;

    channel.perform("echo", { message: content });
  }

  function broadcast(content) {
    if (!channel) return;

    channel.perform("broadcast", { message: content });
  }

  function disconnect() {
    if (!cable) return;

    cable.disconnect();
    cable = null;
  }

  var form = document.getElementById("connect");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Customize options from form elements
    url = form.querySelector("input[name='url']").value;
    options.logLevel = form.querySelector("select[name='logLevel']").value;
    options.protocol = form.querySelector("select[name='protocol']").value;

    connect();
  });

  var echoButton = document.getElementById("echoBtn");
  echoButton.addEventListener("click", function (event) {
    event.preventDefault();

    var contentEl = document.getElementById("content");
    var contents = contentEl.value;
    echo(contents);
    contentEl.value = "";
  });

  var broadcastButton = document.getElementById("broadcastBtn");
  broadcastButton.addEventListener("click", function (event) {
    event.preventDefault();

    var contentEl = document.getElementById("content");
    var contents = contentEl.value;
    broadcast(contents);
    contentEl.value = "";
  });

  var disconnectButton = document.getElementById("disconnectButton");
  disconnectButton.addEventListener("click", disconnect);
})();
