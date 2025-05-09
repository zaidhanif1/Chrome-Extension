let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el")



function addLead() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    renderLeads()
}

// Use the same function for both events
inputBtn.addEventListener("click", addLead)
inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addLead()
    }
})

    function renderLeads() {
        let listItems = ""
        for (let i = 0; i < myLeads.length; i++) {
            // Wrap the lead in an anchor tag (<a>) inside the <li>
            // Can you make the link open in a new tab?
            listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
            console.log(listItems)
        }
        ulEl.innerHTML = listItems  
    }
      
      





