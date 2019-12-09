/*
 * Konami-JS ~
 * :: Modified to support any given pattern(mostly idkfa!)
 * Code: https://github.com/snaptortoise/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.6.2 (7/17/2018)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1+ and Android
 */

const PATTERN_KONAMI = "38384040373937396665";
const PATTERN_IDKFA = "7368757065"

const Konami = function (callback : any, input_pattern : any) : any {
   var konami = {
       addEvent: function (obj : any, type : any, fn : any, ref_obj : any) {
           if (obj.addEventListener)
               obj.addEventListener(type, fn, false);
           else if (obj.attachEvent) {
               // IE
               obj["e" + type + fn] = fn;
               obj[type + fn] = function () {
                   obj["e" + type + fn](window.event, ref_obj);
               }
               obj.attachEvent("on" + type, obj[type + fn]);
           }
       },
       removeEvent: function (obj : any, eventName : any, eventCallback : any) {
           if (obj.removeEventListener) {
               obj.removeEventListener(eventName, eventCallback);
           } else if (obj.attachEvent) {
               obj.detachEvent(eventName);
           }
       },
       input: "",
       pattern: input_pattern,
       keydownHandler: function (e : any, ref_obj : any) {
           if (ref_obj) {
               konami = ref_obj;
           } // IE
           konami.input += e ? e.keyCode : (event as any).keyCode;
           if (konami.input.length > konami.pattern.length) {
               konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
           }
           if (konami.input === konami.pattern) {
               konami.code((konami as any)._currentLink);
               konami.input = '';
               e.preventDefault();
               return false;
           }
       },
       load: function (link : any) {
           this._currentLink = link;
           this.addEvent(document, "keydown", this.keydownHandler, this);
       },
       unload: function () {
           this.removeEvent(document, 'keydown', this.keydownHandler);
       },
       code: function (link : any) {
           window.location = link
       }
   }

   typeof callback === "string" && konami.load(callback);
   if (typeof callback === "function") {
       konami.code = callback;
       (konami as any).load();
   }

   return konami;
}

export {Konami, PATTERN_IDKFA, PATTERN_KONAMI};
export default Konami;