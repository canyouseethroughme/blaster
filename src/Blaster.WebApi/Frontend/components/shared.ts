import Vue from "vue";
import UserManagementPlugin from "../plugins/userManagementPlugin";
import HttpClientPlugin from "../plugins/httpClientPlugin";
import {InstallRequestMsalHandler} from "../plugins/HttpHandlers/RequestMsalHandler";
import ChannelPickerComponent from "./ChannelPickerComponent";
import ChannelMinimalComponent from "./ChannelMinimalComponent.vue";
import ChannelListComponent from "./ChannelListComponent.vue";
import ChannelDropdownComponent from "./ChannelDropdownComponent.vue";
import ChannelIconComponent from "./ChannelIconComponent.vue";
import ChannelInputComponent from "./ChannelInputComponent.vue";
import BannerComponent from './BannerComponents.vue';

function isIE() : number
{
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
}

Vue.use(UserManagementPlugin);
Vue.use(HttpClientPlugin);
InstallRequestMsalHandler(Vue);

new Vue({
    el: ".navbar",
    computed: {
        showIEBanner: function () {
            return isIE();
        },
        isActive: function() {
            return this.active;
        }
    },
    methods: {
        toggleActive: function () {
            this.active = !this.active;
        }
    },
    data: {
        active: false
    }
    
});


export {BannerComponent, ChannelPickerComponent, ChannelListComponent, ChannelMinimalComponent, ChannelDropdownComponent, ChannelIconComponent, ChannelInputComponent, isIE};