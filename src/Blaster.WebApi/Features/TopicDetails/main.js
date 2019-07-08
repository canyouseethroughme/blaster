import Vue from "vue";
import jq from "jquery";
import ModelEditor from "modeleditor";
import TopicService from "topicservice"

const topicService = new TopicService();

const app = new Vue({
    el: "#topicdetail-app",
    data: {
        topic: null,
        initializing: true
    },
    methods: {
        newMessageExample: function() {
            const editor= ModelEditor.open({
                template: document.getElementById("new-message-example-template"),
                data: {
                    messageType: "",
                    text: ""
                },
                onClose: () => editor.close(),
                onSave: (newMessageExample) => {
                    return topicService.addMessageExample(this.topic.name, newMessageExample)
                        .then(() => editor.close());
                }
            });
        }
    },
    mounted: function () {
        const topicNameParam = new URLSearchParams(window.location.search).get('topicname');
    
        jq.ready
            .then(() => topicService.get(topicNameParam))
            .then(topic => this.topic = topic)
            .done(() => this.initializing = false);
    }
});