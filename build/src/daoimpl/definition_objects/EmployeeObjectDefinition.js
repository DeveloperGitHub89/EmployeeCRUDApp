"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
exports.definition = [{
        id: { column: 'id', type: 'NUMBER' },
        fname: 'fname',
        lname: 'lname',
        phone: 'phone',
        dob: 'dob',
        salary: { column: 'salary', type: 'NUMBER' },
        addresses: [{
                address: 'address',
                type: 'type'
            }],
        department: {
            id: { column: 'department_id', type: 'NUMBER' },
            name: 'name',
            description: 'description',
            location: 'location',
        }
    }];
