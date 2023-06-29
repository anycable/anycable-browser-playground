const EventTargetPolyfill = require("@mattkrick/event-target-polyfill");
window.EventTarget = EventTargetPolyfill;

require("yet-another-abortcontroller-polyfill");
require("whatwg-fetch");
