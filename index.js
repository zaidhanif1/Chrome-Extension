let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")



if (leadsFromLocalStorage) 
{
    myLeads = leadsFromLocalStorage
    render(myLeads)
}




//event listeners--------------------------


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, saveTab)
})
deleteBtn.addEventListener("dblclick", emptyArray)
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
      
      
    function emptyArray() 
    {
        myLeads = []
        localStorage.clear()
        render(myLeads)
    }
    
    function addLead() 
    {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        console.log(localStorage.getItem("myLeads"))
    }
    
    function saveTab(tabs)
    {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }


//functions end -----------------------------




