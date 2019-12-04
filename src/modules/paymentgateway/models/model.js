'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PaymentgatewaySchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Paymentgateway name',
    // },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    order: {
        type: Number,
    },
    enabled: {
        type: Boolean,
    },
    method_title: {
        type: String,
    },
    method_description: {
        type: String,
    },
    method_supports: {
        type: [],
    },
    settings: {
        
            id: {
                type: String
            },
            label: {
                type: String
            },
            description: {
                type: String
            },
            type: {
                type: String,
                enum: ["text", "email", "number", "color", "password", "textarea", "select", "multiselect", "radio", "image_width", "checkbox"]
            },
            value: {
                type: String
            },
            default: {
                type: String
            },
            tip: {
                type: String
            },
            placeholder: {
                type: String
            }

        
    },





    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Paymentgateway", PaymentgatewaySchema);