class User {
    data = {};

    edit(obj){
        this.data = obj;
    };
    get(){
        return this.data;
    }
};

class Contacts {
    data = [];

    add(){
        let user = new User;
        this.data.push(user);
    };

    adit(id,obj){
        let contactMy = this.data[id];
        contactMy.edit(obj);
    };

    remove(idn){
        let timeArr = [];

        for(let i=0;i <= this.data.length-1;i++){

            let num = this.data[i].data.id;
            
            if(num != idn){
                timeArr.push(this.data[i])
            };
        }

        this.data = timeArr;
    };

    get(){
        return this.data;
    }
};

let myContacts_1 = new Contacts;

class ContactsApp extends Contacts {

    storage(inst,arr){

        if (inst === 'getArr'){

            let arrJson = JSON.stringify(arr);
            localStorage.setItem('contactData',arrJson);

            function setCookie(cname, cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }

            let nameCook = 'localStorage',
                daysCook = 10;
            
            setCookie(nameCook, '1', daysCook)
        }

    }

};