import "./style.css"
import { useState, useEffect } from "react"

function GroceryBud(){

    const [localStorageItem, setLocalStorage] = useState([]);

    useEffect(()=>{
            // const listLen = JSON.parse(localStorage.getItem('list')).length;
                const data = JSON.parse(localStorage.getItem('list'));
                if(data){
                    // console.log("jack");
                // localStorage.setItem('list', JSON.stringify(localStorageItem));
                setLocalStorage(data);
                }
            // console.log("List is empty");
    },[]);

    function addItem(){
        var itemName = document.getElementById("input").value;
        if(!itemName){
            alert("Please add some grocery item!");
            return;
        }
        setLocalStorage([...localStorageItem,{name : itemName, isChecked : false}]);
        localStorage.setItem('list', JSON.stringify([...localStorageItem,{name : itemName, isChecked : false}]));
    }
    const handleDelete = (item)=>{
        const newList = localStorageItem.filter(val => val !== item);
        setLocalStorage(newList);
        localStorage.setItem("list", JSON.stringify(newList));
    }
    // function handleDelete(item){
    //     // const val = item.target.parentElement.children[0].children[1].textContent;
    //     // localStorage.removeItem(item.target.parentElement.children[0].children[1].textContent);
    //     // localStorage.removeItem(id.target.value);
    //     console.log(item);
    // }
    // [{name: "bread", isChecked: false}, {name: "milk", isChecked: false}]

    function handleCheck(id){
        // const list = !JSON.parse(localStorage.getItem('list'))[id].isChecked;
        const list = JSON.parse(localStorage.getItem('list'));
        // console.log(list);
        list[id].isChecked = !list[id].isChecked;
        setLocalStorage(list);
        localStorage.setItem("list",JSON.stringify(list));
    }

    return (
        <div>
            <div id="main-cont">
                <h2>Grocery Bud</h2>
                <input type="text" id="input"/>
                <button onClick={addItem} id="add-btn">Add Item</button>
                <div>
                {
                    localStorageItem.map((item,id)=>{
                        return (
                            <div id="item-list" key={id}>
                                <div id="check">
                                    <input type="checkbox" checked={item.isChecked} onClick={()=>{handleCheck(id)}} />
                                    <h3 style={{textDecoration:item.isChecked ? "line-through" : "none"}}>{item.name}</h3>
                                </div>
                                <button id="delete" onClick={()=>handleDelete(item)}>Delete</button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            
        </div>
    );
}

export default GroceryBud;