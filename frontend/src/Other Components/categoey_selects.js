import {useContext, createContext, useEffect, useState} from 'react';

const UserContext = createContext('Unknown');

function Categories(){
    let [Category_request, setCategory_request] = useState([]);
    let [Category_help, setCategory_help] = useState([]);

    //fetch data (Seek Help)
    useEffect(() => {
        async function runThis() {
            let raw = await fetch(`api/load-all-helpers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bol: 1,
                }),
            });
            let res = await raw.json();
            let categoryTemp = [];
            for (const element of res) {
                categoryTemp.push(element.Category);
            }
            //remove duplicate category options.
            categoryTemp = categoryTemp.filter(function (item, pos) {
                return categoryTemp.indexOf(item) === pos;
            });
            //load all distinct category into the dropdown bar
            setCategory_request(categoryTemp);
        }
        runThis().catch(console.dir);
    }, []);

    //fetch data (Offer Help)
    useEffect(() => {
        async function runThis() {
            let raw = await fetch(`api/load-seeks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bol: 1,
                }),
            });

            let res = await raw.json();
            let categoryOffers = [];
            let postTemp = [];
            for (const element of res) {
                categoryOffers.push(element.Category);
                postTemp.push(element);
            }
            //remove duplicate category options.
            categoryOffers = categoryOffers.filter(function (item, pos) {
                return categoryOffers.indexOf(item) === pos;
            });
            //load all distinct category into the dropdown bar
            setCategory_help(categoryOffers);
        }
        runThis().catch(console.dir);
    }, []);
}

export default Categories;
