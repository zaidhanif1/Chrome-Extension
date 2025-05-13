import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js"
import { config } from './config.js'

const firebaseConfig = 
{
    databaseURL: config.databaseURL
}
console.log(firebaseConfig.databaseURL)

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

console.log(firebaseConfig.databaseURL )




const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")



//event listeners--------------------------


deleteBtn.addEventListener("dblclick", removeLeads)
inputBtn.addEventListener("click", addLead)
inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {    
        addLead()
    }
})

//event listeners end ----------------------

//functions--------------------------------
    function render(leads) 
    {
        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            // Wrap the lead in an anchor tag (<a>) inside the <li>
            // Can you make the link open in a new tab?
            listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `

        }
        ulEl.innerHTML = listItems  
    }
      
      
    
    function addLead() 
    {
        push(referenceInDB, inputEl.value)
        inputEl.value = ""


    }
    onValue(referenceInDB, function(snapshot)
    {
        const snapshotDoesExist = snapshot.exists()
        if(snapshotDoesExist)
        {
            const snapshotValues = snapshot.val()
            const leads = Object.values(snapshotValues)
            render(leads)
        }

    })

    function removeLeads()
    {
        remove(referenceInDB)
        ulEl.innerHTML = ""
    }
    
  

//functions end -----------------------------
 



