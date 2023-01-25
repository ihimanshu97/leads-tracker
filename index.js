if (!localStorage.getItem('myLeads')) {
    localStorage.setItem('myLeads', '[]');
}

const title = document.querySelector('#title');
const url = document.querySelector('#url');
const saveInputBtn = document.querySelector('#save-input-btn');
const saveTabBtn = document.querySelector('#save-tab-btn');
const deleteAllBtn = document.querySelector('#delete-all-btn');
const leadsUl = document.querySelector('#leads-ul');

function render(leads) {
    leadsUl.innerHTML = '';
    leads.forEach(lead => {
        leadsUl.innerHTML += 
        `<li>
            <a target='_blank' href='${lead.url}'>${lead.title}</a>
            <button class='delete-lead'>x</button>
        </li>`;
    })
}

let myLeads = JSON.parse(localStorage.getItem('myLeads'));
render(myLeads);

saveInputBtn.onclick = () => {
    let newLead = {
        title: title.value,
        url: url.value
    };
    myLeads.push(newLead);
    title.value = '';
    url.value = '';
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
}

saveTabBtn.onclick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let newLead = {
            title: tabs[0].title,
            url: tabs[0].url
        };
        myLeads.push(newLead);
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads);
    })
}

deleteAllBtn.ondblclick = () => {
    localStorage.clear();
    myLeads = [];
    leadsUl.innerHTML = '';
}
