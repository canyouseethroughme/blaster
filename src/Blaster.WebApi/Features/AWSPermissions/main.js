import Vue from "vue";
import AWSPermissionsService from "./awspermissions-service";
import AlertDialog from "../Shared/alert-dialog";
import jq from "jquery";

const awsPermissionsService = new AWSPermissionsService();

const app = new Vue({
    el: "#awspermissions-app",
    data: {
        items: [],
        initializing: true
    },
    computed: {
        hasAWSPermissions: function () {
            return this.items.length > 0;
        }
    },
    methods: {
    },
    mounted: function () {
        jq.ready
            .then(() => awsPermissionsService.getAll())
            .then(awsPermissions => awsPermissions.forEach(permission => this.items.push(permission)))
            .catch(info => {
                if (info.status != 200) {
                    const message = `Could not retrieve list of AWS permissions for this capability. Server returned (${info.status}) ${info.statusText}.`;

                    AlertDialog.open({
                        template: document.getElementById("error-dialog-template"),
                        container: document.getElementById("global-dialog-container"),
                        data: {
                            title: "Error!",
                            message: message
                        }
                    });
                }
            })
            .done(() => this.initializing = false);
    }
});