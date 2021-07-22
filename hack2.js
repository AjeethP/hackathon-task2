function contacts(){
    fetch("https://newaccount1626936985753.freshdesk.com/api/v2/contacts", {
        method: "GET",
        headers:{
            Authorization: 'Basic ' + btoa("ZDB3A2KaFxXPKWRGBi")
        }
        
      })
        .then((data) => {
         return data.json();
        })
        .then((users) => loadUsers(users));
    }
    
    contacts();
    
    
    function loadUsers(users) {
        const userList = document.createElement("div");
        userList.className = "user-list";
        users.forEach((user) => {
          const userContainer = document.createElement("div");
          userContainer.className = "user-container";
          userContainer.innerHTML = `
          
            <div>
               <h3 >${user.name}</h3>
               <p class="user-name"><span class="head">Email: </span>${user.email}</p>
               <p class="user-name"><span class="head">Id: </span>${user.id}</p>
               <p class="user-time" ><span class="head">Created_at: </span>${new Date(user.created_at).toDateString()}</p>
               <p class="user-name"><span class="head">Time Zone: </span>${user.time_zone}</p>
               <p class="user-time" ><span class="head">Updated_at </span>${new Date(user.updated_at).toDateString()}</p>
               <button   onclick="editcontact('${user.id}','${user.name}','${user.email}')">Edit</button>
             </div>
            `;
      
          userList.append(userContainer);
        });
      
        document.body.append(userList);
      }
    
    
      
      function editcontact(UserId,UserName,UserEmail){
        
        console.log("Editing",UserId,UserName,UserEmail);
        document.querySelector(".submit-contact").innerText="Edit Contact"
        document.querySelector(".new-name").value=UserName;
        document.querySelector(".new-email").value=UserEmail;
        localStorage.setItem("UserId",UserId)
        
      
      
      }
     
      
      function addcontact() {
         
        let type=document.querySelector(".submit-contact").innerText==="Edit Contact" ? "Edit" : "Add"
      
      
      
        if(type=="Add"){
      
      
      
        const name = document.querySelector(".new-name").value;
        const email = document.querySelector(".new-email").value;
        const created_at = new Date();
        const contactdetails = {
          name: name,
          email:email,
          created_at: created_at
        };
      
        // Add User to the mockapi
        fetch("https://newaccount1626936985753.freshdesk.com/api/v2/contacts", {
          method: "POST",
          headers: {
            Authorization: 'Basic ' + btoa("ZDB3A2KaFxXPKWRGBi"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactdetails)
        })
          .then((data) => {
            console.log(data);
            return data.json();
          })
          .then((users) => refreshcontacts());
      
        console.log("Adding Contact....", contactdetails);
      }
      else{
        const id=localStorage.getItem("UserId");
        const name = document.querySelector(".new-name").value;
        const email = document.querySelector(".new-name").value;
        const created_at = new Date();
        const contactdetails = {
          name: name,
          email: email,
          created_at: created_at
        }
        // Add User to the mockapi
        fetch(`https://newaccount1626936985753.freshdesk.com/api/v2/contacts/[${id}]`, {
          method: "PUT",
          headers: {
            Authorization: 'Basic ' + btoa("ZDB3A2KaFxXPKWRGBi"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactdetails)
        })
        .then((users) => refreshcontacts());
      }
      }
         
      function refreshcontacts() {
        // userList
        document.querySelector(".user-list").remove();
        //reset();
        contacts();
      }
    
     
      function reset(){
        document.querySelector(".submit-contact").innerText="Add contact"
        document.querySelector(".new-name").value="";
        document.querySelector(".new-email").value="";
      }