let contactsWrapper = document.querySelector(`#contactsWrapper`);

let listaContattiBtn = document.querySelector(`#listaContattiBtn`);
let aggiungiContattiBtn = document.querySelector(`#aggiungiContattiBtn`);

let nameInput = document.querySelector(`#nameInput`);
let numberInput = document.querySelector(`#numberInput`);

let check = false;


const rubrica = {
  
  lista_contatti : [
    {contact_name : "Vegeta", phone_numbewr : 33333333},
    {contact_name : "Goku", phone_numbewr : 4444444},
    {contact_name : "Bulma", phone_numbewr : 55555555}
  ],
  
  showContacts : function (){
    
    contactsWrapper.innerHTML = ``;
    
    this.lista_contatti.forEach((contatto)=>{
      let div = document.createElement(`div`);
      div.classList.add(`schedaContatto`);
      div.innerHTML =`
        <p class="lead ms-2 mt-0 mb-0 pt-0 pb-0 fs-1 text">${contatto.contact_name}</p>
        <p class="mt-0 mb-0 pt-0 pb-0 ps-2 me-2 pe-2 fs-2 text ">${contatto.phone_numbewr}</p>
        <i class="fa-solid fa-pencil fa-2x pencilCustom"></i>
        <i class="fa-solid fa-trash-can me-4 trashCustom fa-2x"></i>
        <div class="modal" tabindex="-1">`;
      contactsWrapper.appendChild(div);
      
    })   
    
    let modifiche = document.querySelectorAll(`.pencilCustom`);
    
    let icons = document.querySelectorAll(`.trashCustom`);
    
    icons.forEach((icona, i)=>{
      icona.addEventListener(`click`, ()=>{
        this.lista_contatti.splice(i,1);
        this.showContacts();
      })
    })
    
    modifiche.forEach((modifica, i)=>{
      modifica.addEventListener('click', () => {
        let index = i;
        let nuovoNome = prompt("Inserisci il nuovo nome"); 
        let nuovoNumero = prompt("Inserisci il nuovo numero");
        
        while (!nuovoNome || !validateName(nuovoNome) || !nuovoNumero || !validateNumber(nuovoNumero)) {
          nuovoNome = prompt("Inserisci un nome valido (solo lettere)");
          nuovoNumero = prompt("Inserisci un numero valido (solo numeri)");
      
          if (nuovoNome === null || nuovoNumero === null) {

            return;
          }
        }

        rubrica.modificaContatto(index, nuovoNome, nuovoNumero);
        rubrica.showContacts();
    })
    });
    
  }, 
  
  modificaContatto: function(index, newName, newNumber) {
    this.lista_contatti[index].contact_name = newName;
    this.lista_contatti[index].phone_numbewr = newNumber; 
    
  },
  
  addContact : function(newName, newNumber){
    this.lista_contatti.push({contact_name : newName, phone_numbewr : newNumber});
    
    
  },
  

  
  rimuoviContatto : function(removedName){
    
    let names = this.lista_contatti.map((contatto)=>contatto.contact_name);
    
    let index = names.indexOf(removedName);
    
    if(index >= 0){
      this.lista_contatti.splice(index,1);
      rubrica.showContacts();
      
      if(check == false)
        {
        rubrica.showContacts();
        check = true;
        listaContattiBtn.innerHTML = `Nascondi i contatti`;
        
      }
    }
    
  }
};




listaContattiBtn.addEventListener(`click`, ()=> {
  if(check == false)
    {
    rubrica.showContacts();
    check = true;
    listaContattiBtn.innerHTML = `Nascondi i contatti`;
    
  }else{
    contactsWrapper.innerHTML = ``;
    check = false;
    listaContattiBtn.innerHTML = `Mostra i contatti`;
  }
  
});

aggiungiContattiBtn.addEventListener(`click`, ()=>{
  if(nameInput.value && numberInput.value)
    {
    rubrica.addContact(nameInput.value, numberInput.value);
    nameInput.value = ``;
    numberInput.value = ``;
    rubrica.showContacts();
    if(check == false)
      {
      check = true;
      
      listaContattiBtn.innerHTML = `Nascondi i contatti`;
      
    }
    
  }else{
    alert(`Campi incompleti`);
  }
  
  
});

function validateName(name) {
  const regex = /^[a-zA-Z]+$/; // Matches only letters
  return regex.test(name);
}

function validateNumber(number) {
  const regex = /^[0-9]+$/; // Matches only numbers
  return regex.test(number);
}




