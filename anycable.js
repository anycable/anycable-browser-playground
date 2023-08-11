import * as AnyCable from "@anycable/web";
import { LongPollingTransport } from "@anycable/long-polling";
import { MsgpackEncoder } from "@anycable/msgpack-encoder";
import { ProtobufEncoder, ProtobufEncoderV2 } from "@anycable/protobuf-encoder";

window.AnyCable = AnyCable;
window.LongPollingTransport = LongPollingTransport;
window.MsgpackEncoder = MsgpackEncoder;
window.ProtobufEncoder = ProtobufEncoder;
window.ProtobufEncoderV2 = ProtobufEncoderV2;
