import axios from 'axios';

class TodoService {

    static data = [
        { 
            id: 1,
            priority: 1,
            group: 'group1',
            note: 'ToDoNote 1'
        },
        { 
            id: 2,
            priority: 2,
            group: 'group1',
            note: 'ToDoNote 2'
        },
        { 
            id: 3,
            priority: 2,
            group: 'group1',
            note: 'ToDoNote 3'
        },
        { 
            id: 4,
            priority: 1,
            group: 'group2',
            note: 'ToDoNote 4'
        }
    ];        

    static getToDoByUser (user) {

        if (process.env.REACT_APP_SERVICES_WITHOUT_BACKEND === 'true') {

            let self = this;

            return new Promise(function (resolver, reject) {
                resolver({ data: self.data});
            });

        } else {

            return axios.get(`http://localhost:8080/ToDo/${user}`);

        }

    }

    static addToDo(user, newToDoNote) {        

        if (process.env.REACT_APP_SERVICES_WITHOUT_BACKEND === 'true') {
            
            let self = this;

            return new Promise(function (resolver, reject) {
                self.data.push(newToDoNote);
                resolver({data : true});
            });

        } else {

            return axios.post(`http://localhost:8080/ToDo/${user}`, {  
                priority: newToDoNote.priority,
                group: newToDoNote.group,
                note: newToDoNote.note
            });        
        }

    }

    static updateToDo(user, toDoNote) {        

        if (process.env.REACT_APP_SERVICES_WITHOUT_BACKEND === 'true') {
            
            let self = this;

            return new Promise(function (resolver, reject) {
                
                let ok = false;

                for (var i = 0; i < self.data.length; i++) {

                    if (self.data[i].id === toDoNote.id) {
                        
                        self.data[i] = toDoNote;
                        ok = true;
                        break;
                    }
                }

                resolver({data : ok});
            });

        } else {

            return axios.put(`http://localhost:8080/ToDo/${user}`, {  
                id: toDoNote.id,
                priority: toDoNote.priority,
                group: toDoNote.group,
                note: toDoNote.note
            });        
        }

    }

    static deleteToDo(user, id) {

        if (process.env.REACT_APP_SERVICES_WITHOUT_BACKEND === 'true') {
            
            let self = this;

            return new Promise(function (resolver, reject) {

                let index = -1;

                for (var i = 0; i < self.data.length; i++) {

                    if (self.data[i].id === id) {
                        index = i;
                        break;
                    }
                }

                if (index < 0) {
                    return false;
                } else {
                    self.data.splice(index, 1);
                }

                resolver({data : index >= 0});
            });

        } else {

            return axios.delete(`http://localhost:8080/ToDo/${user}/${id}`);        
        }

    }

}

export default TodoService;