const libraryContacts= function(){

    
    let contactsApp = new ContactsApp;
    let instAdd;

    let newContact = document.querySelector('.newContact'),
        newContact_form = `
        <div class="newContact_form">
            <input class="newContact_form_input"name="name" min="3" max="12" required placeholder="name" type="text">
            <input class="newContact_form_input"name="phone" min="5" max="12" required placeholder="phone" type="num">
            <input class="newContact_form_input"name="emeil" min="5" max="20" placeholder="emeil" type="email">
            <input class="newContact_form_input"name="address" min="5" max="40" placeholder="address" type="text">
            <input class="newContact_form_btn" type="submit" value="создать контакт">
        </div>`;

    newContact.innerHTML = newContact_form;

    let inputForm = document.querySelector('.newContact_form'),
        inputBtn = inputForm.querySelector('.newContact_form_btn'),  
        outCntakt = document.querySelector('.contacts'),
        allContaks,
        dataID = 0;

    const updateCont = function(){
    
        let timeArr = myContacts_1.get();  

        outCntakt.innerHTML= "";
        if (timeArr.length < 1) localStorage.removeItem('contactData'); 
        if (timeArr.length < 1) return;    

        for(let i=0;i <= timeArr.length-1;i++){
                
            let timeArrUser=timeArr[i].get(),
                contactStr =
            `<div class="contacts_contact">
                <ul>
                    <li class="contacts_contact_name">${timeArrUser.name}</li>
                    <li class="contacts_contact_phone">${timeArrUser.phone}</li>
                    <li class="contacts_contact_emeil"><span  class="contacts_contact_info">${timeArrUser.emeil}</span></li>
                    <li class="contacts_contact_address"><span  class="contacts_contact_info">${timeArrUser.address}</span></li>                    
                </ul>

                <ul class="contacts_contact_btns">
                    <li class="contacts_contact_btns_content" hidden><span>${timeArrUser.id}</span></li>
                    <li><input class="contacts_contact_btns_content" type="submit" value="информация"></li>
                    <li><input class="contacts_contact_btns_content" type="submit" value="редактировать"></li>
                    <li><input class="contacts_contact_btns_content" type="submit" value="удалить"></li>
                </ul>
            </div> `;
            outCntakt.innerHTML += contactStr;
        };
        listenerOptions();
        contactsApp.storage(instAdd ='getArr',timeArr);
    };

    let contactEditBag = document.querySelector('.contact_edit_bag'),
        EditForm = ``;
        
        const contactEditForm = function(argument,name,phone,emeil,address){
        if(argument == true){
            EditForm = `
            <div class="contact_edit">
                <div class="contact_edit_form">
                    <span  class="contact_edit_form_histori">${name}</span>
                    <input class="contact_edit_form_input"name="name" min="3" max="12" required placeholder="name" type="text">
                    <span  class="contact_edit_form_histori">${phone}</span>
                    <input class="contact_edit_form_input"name="phone" min="5" max="12" required placeholder="phone" type="num">
                    <span  class="contact_edit_form_histori">${emeil}</span>
                    <input class="contact_edit_form_input"name="emeil" min="5" max="20" placeholder="emeil" type="email">
                    <span  class="contact_edit_form_histori">${address}</span>
                    <input class="contact_edit_form_input"name="address" min="5" max="40" placeholder="address" type="text">
                    <input class="contact_edit_form_btn_y" type="submit" value="изменить">
                    <input class="contact_edit_form_btn_n" type="submit" value="отмена">
                </div>
            </div>`;
            contactEditBag.classList.remove('contacts_contact_info');
            contactEditBag.innerHTML = EditForm;
        };

        if(argument == false){
            EditForm = '';
            contactEditBag.classList.add('contacts_contact_info');
            contactEditBag.innerHTML = EditForm;
        };

    }

    const listenerOptions = function(){
        allContaks = outCntakt.querySelectorAll('.contacts_contact_btns_content');

        if(!allContaks)return;
    
        for( let i = 0, n=1,t = 0;i <= allContaks.length - 1;i++,n++){

            allContaks[i].addEventListener('click',function(){
                let timeArr = myContacts_1.get();
                let timeArrUser=timeArr[t].get();
                let timeId=timeArrUser.id;
                console.log('eeeee','i:',i,'n:',n,'t:',t,'timeId:',timeId);

                if(n==4){myContacts_1.remove(timeId);
                    updateCont()
                };
                    
                let infoEmei = document.querySelectorAll('.contacts_contact_emeil'),
                    infoAddres = document.querySelectorAll('.contacts_contact_address');

                if(!infoEmei[t] || !infoAddres[t])return;

                let spenE = infoEmei[t].querySelector('span'),
                    spenA = infoAddres[t].querySelector('span');

                if(n==2){
                    spenE.classList.toggle('contacts_contact_info');
                    spenA.classList.toggle('contacts_contact_info');                
                };

                let timeName= timeArrUser.name,
                    timePhone= timeArrUser.phone,
                    timeEmeil= timeArrUser.emeil,
                    timeAddress= timeArrUser.address;
                
                if(n==3){

                    contactEditForm(true,timeName,timePhone,timeEmeil,timeAddress);
                    let newOptionsContact = document.querySelector('.contact_edit_form'),      
                        battonY = document.querySelector('.contact_edit_form_btn_y'),
                        battonN = document.querySelector('.contact_edit_form_btn_n');                
        
                    battonY.addEventListener('click',function(){ 

                        let newName = newOptionsContact.querySelector('input[name = "name"]').value,
                            newPhone = newOptionsContact.querySelector('input[name = "phone"]').value,
                            newEmeil = newOptionsContact.querySelector('input[name = "emeil"]').value,
                            newAddress = newOptionsContact.querySelector('input[name = "address"]').value;

                        if(newName == null || newName == undefined || newName.length < 2){newName = timeName};
                        if(newPhone == null || newPhone == undefined || newPhone.length < 2){newPhone = timePhone};
                        if(newEmeil == null || newEmeil == undefined || newEmeil.length < 2){newEmeil = timeEmeil};
                        if(newAddress == null || newAddress == undefined || newAddress.length < 2){newAddress = timeAddress};


                        let timeObj = {
                            id:timeId,
                            name: newName,
                            emeil: newEmeil,
                            address: newAddress,
                            phone: newPhone}; 

                        myContacts_1.adit(t,timeObj);

                        contactEditForm(false);

                        updateCont()

                    });
                    
                    battonN.addEventListener('click',function(){
                        contactEditForm(false);
                    });

                    
                };

            });

            if(n >4){n=1,t++};
        }
    }


    inputBtn.addEventListener('click',function(){
            
    let inputName = inputForm.querySelector('input[name = "name"]').value,
        inputPhone = inputForm.querySelector('input[name = "phone"]').value,
        inputEmeil = inputForm.querySelector('input[name = "emeil"]').value,
        inputAddress = inputForm.querySelector('input[name = "address"]').value;

    if(!inputName || inputName.length < 2){inputName = 'имя не указано'};
    if(!inputPhone || inputPhone.length < 2){inputPhone = 'телефон не указано'};
    if(!inputEmeil || inputEmeil.length < 2){inputEmeil = 'мыло не указано'};
    if(!inputAddress || inputAddress.length < 2){inputAddress = 'обитание не указано'};

    let inputObj = {
            id:dataID,
            name: inputName,
            emeil: inputEmeil,
            address: inputAddress,
            phone: inputPhone};

        myContacts_1.add();

        let timeArr = myContacts_1.get(),
            inputID = timeArr.length-1;

        myContacts_1.adit(inputID,inputObj);

        dataID++;

        updateCont();

    inputName = inputForm.querySelector('input[name = "name"]').value='';
    inputPhone = inputForm.querySelector('input[name = "phone"]').value='';
    inputEmeil = inputForm.querySelector('input[name = "emeil"]').value='';
    inputAddress = inputForm.querySelector('input[name = "address"]').value='';

    });

    const getData = function(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json =>{
            for(let i=0;i <= json.length-1;i++){
                let inputObj = {
                id:json[i].id,
                name: json[i].name,
                emeil: json[i].email,
                address: json[i].website,
                phone: json[i].phone};

                myContacts_1.add();
    
                let timeArr = myContacts_1.get(),
                    inputID = timeArr.length-1;
    
                myContacts_1.adit(inputID,inputObj);

                if(dataID <= inputObj.id){
                    dataID = inputObj.id + 1
                }
            }
            updateCont()
        })
    }

    


    const contactsAppHellp = function(){        

        let arrJson = localStorage.getItem('contactData');
        if(!arrJson){
            getData()
        } else{
        
        arrJson = JSON.parse(arrJson);

            for(let i=0;i <= arrJson.length-1;i++){

                let inputObj = arrJson[i].data
        
                myContacts_1.add();
        
                let timeArr = myContacts_1.get(),
                    inputID = timeArr.length-1;
        
                myContacts_1.adit(inputID,inputObj);

                if(dataID <= inputObj.id){
                    dataID = inputObj.id + 1
                }
    
            }
        }
        updateCont();
    }

    contactsAppHellp();

    function getCookie(name) {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }
    if(getCookie('localStorage') == null){localStorage.removeItem('contactData')};



  
};
libraryContacts();