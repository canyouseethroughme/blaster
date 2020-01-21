import Vue from "vue";
import TopicService from "./topicservice";

const TopicAddComponent = Vue.component("topic-add", {
	props: ["enable", "capabilityId"],
	mounted: function () {
	},
	data: function () {
		return {
			topicDescription: "",
			topicNameInput: "",
			topicPartitions: 0,
			topicNamePreview: "",
			topicName: "",
			topicService: new TopicService()
		}
	},
	watch: {
		topicNameInput(value) {
			this.topicService
				.add(
					this.capabilityId,
					{
						"name": value,
						"partitions": this.topicPartitions,
						"description": this.topicDescription,
						"dryrun": true
					}
				)
				.then(r => {
						console.log(r);
						this.topicNamePreview = r.name;
					}
				);
		}
	},
	computed: {
		isEnabledStyling: function () {
			return this.enable;
		},
		isMiscInUse: function () {
			return this.topicMisc !== "";
		},
	},
	methods: {
		saveTopic: function () {
			this.topicService
				.add(
					this.capabilityId,
					{
						"name": this.topicNameInput,
						"partitions": this.topicPartitions,
						"description": this.topicDescription,
						"dryrun": false
					}
				)
				.then(r => {
						console.log(r);
						console.log("Awesome");
					}
				);
		},
		disable: function () {
			this.enable = false;
		},
		toSnakeCase: function (input) {
			return input.replace(/\W+/g, " ")
				.split(/ |\B(?=[A-Z])/)
				.map(word => word.toLowerCase())
				.join('_');
		}
	},
	updated: function () {
		if (!this.enable) {
			this.topicDescription = "";
			this.topicMisc = "";
		}
	},
	template: `
        <div class="modal" v-bind:class="{'is-active': this.isEnabledStyling}">
            <div class="modal-background" v-on:click="$emit('addtopic-close')"></div>
            <div class="modal-content" style="width: 80%; max-width: 650px;">
                <div class="modal-card" style="width: 100%;">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Add Topic</p>
                        <button class="delete" aria-label="close" data-behavior="close" v-on:click="$emit('addtopic-close')"></button>
                    </header>
                    <div class="modal-card-body">
                        <div class="dialog-container"></div>
                        <div class="form">
                            <div class="field">
                                <label class="label">Name</label>
                                <div style="display:flex; align-items: flex-end;">
                                    <div style="display: flex; flex-direction: column; align-items: center;">
                                    <span style="font-weight: 700;">Name</span>
                                        <input style="width: 180px;" class="input" type="text" data-property="free" v-model="topicNameInput">
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 20px; margin-bottom: 10px;">
                                    <h3 style="font-size: 1.2rem; font-weight: 700;">Preview of name</h3>
                                    <br />
                                    <div style="display: flex; flex-direction: row; font-size: 1.2rem;">{{ topicNamePreview }}</div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Description</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Description" data-property="description" v-model="topicDescription">
                                </div>
                            </div>
						  	<div class="field">
                                <label class="label">partitions</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="3" v-model="topicPartitions">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-text-centered">
                                    <button class="button is-primary" data-behavior="save" v-on:click="saveTopic">Save</button>
                                    <button class="button is-info" aria-label="close" data-behavior="close" v-on:click="$emit('addtopic-close')">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    `
})

export default TopicAddComponent;
export {TopicAddComponent};