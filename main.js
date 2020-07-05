let table = document.getElementById('tb2');
let sel1 = document.getElementById('sel1');
let sel2 = document.getElementById('sel2');
let sel3 = document.getElementById('sel3');
let sel4 = document.getElementById('sel4');
let card1 = document.getElementById('card1');
let items = document.querySelector('#pagination');


    let obXhr = new XMLHttpRequest();
    table.innerHTML = '';
    obXhr.open('GET', `http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1`);
	
    obXhr.send();

    obXhr.onreadystatechange =() => {
        if (obXhr.readyState != 4) return;
        if (obXhr.status != 200) {
            alert('Сервер недоступен ' + obXhr.status + ' ' + obXhr.statusText);
            return;
        }

        if (obXhr.response) {
            let result = JSON.parse(obXhr.response);//главный массив - получаем один раз
 
			function loadFunc() {  
				
			let arr_sort = result.sort((a, b) => a.rate < b.rate ? 1 : -1);	
				
			let arr_top_20 = [];	
				
				
			for (let i = 0; i < 20; i++){//выводим начиная 20 элементов с конца в отсортированном массиве
				arr_top_20.push(arr_sort[i]);//выводишь	
				
			}	
				
			let update_page = true;
			
			
			
			
			
			
			
			const notesOnPage = 5;
			const countOfPages = Math.ceil(arr_top_20.length / notesOnPage);
			
			
			
			
			
			
			
			
			
			
			
			let pag_div = document.createElement("div");
			pag_div.id = "pagination"
// 			pag_div.class = "input-group mb-3"
// 			pag_div.style = "list-style: unset; padding: unset;"
			
			
			pag_div.innerHTML = 
			`<div class="input-group mb-3">
				<div class="input-group-prepend">
					<span class=" prev input-group-text" style="cursor:pointer">&laquo;</span>
				</div>
				<input type="text" style="width:50px" class="form-control" oninput="changedNumber()" value="1">
				<div class="input-group-append">
					<span class="next input-group-text" style="cursor:pointer">&raquo;</span>
				</div>
			</div>`
			
			
			document.querySelector('#pagination').append(pag_div);
			

			
			
			document.querySelector('#pagination input').oninput = () => {
			    if(!update_page) return
			    if(!document.querySelector('#pagination input').value){
			        show(1)
			        return
			    }
			    if(document.querySelector('#pagination input').value > countOfPages || document.querySelector('#pagination input').value < 1) return
			    update_page = false
			    setInterval(() => {update_page = true}, 1000)
			    show(document.querySelector('#pagination input').value)
			}
			
			document.querySelector('#pagination .next').onclick = () => {
			    if(document.querySelector('#pagination input').value >= countOfPages) return 
			    	if(!document.querySelector('#pagination input').value) 
			    		document.querySelector('#pagination input').value = 1; 
			    document.querySelector('#pagination input').value = parseInt(document.querySelector('#pagination input').value) + 1
			    show(document.querySelector('#pagination input').value)
			}
			document.querySelector('#pagination .prev').onclick = () => {
			    if(document.querySelector('#pagination input').value <= 1) return
			    	 if(!document.querySelector('#pagination input').value) 
			    	 	document.querySelector('#pagination input').value = 1;
			    document.querySelector('#pagination input').value = parseInt(document.querySelector('#pagination input').value) - 1
			    show(document.querySelector('#pagination input').value)
			}
			show();
			function show(page = 1){
			    if (page > countOfPages) return
			    document.getElementById('tb2').innerHTML = arr_top_20.slice((page - 1) * notesOnPage, page * notesOnPage).map((element) => {
			        return `
			        <tr>
						<td>${element.name}</td>
						<td>${element.typeObject}</td>
						<td>${element.address}</td>
						<td><span class="badge badge-light m-3">★${element.rate}</span></td>
						<td><button class=" buttab btn btn-light m-3">выбрать</button></td>
					</tr>
			        `;
			    }).join('')

				
				
				
				
				
				
				
				
				
				
				
				
				
				
/*
				
				
				
				
            	let notesOnPage = 5;
				let table = document.getElementById('tb2');
				let pagination = document.querySelector('#pagination');
            
				let tab;
				let i = 0;
            	let items = [];

				for (let i = 1; i <= 4; i++) {
               	  let but = document.createElement('button');
			   	  but.innerHTML = i;
			   	  but.classList.add('btn');
			   	  but.classList.add('btn-dark');
			   	  but.classList.add('m-1');
			   	  pagination.appendChild(but);
			   	  items.push(but);
			   	}

	            result.sort(function (a, b) {
	                return b.rate - a.rate
	            });
	            for (let key in result) {
	                console.log(result[key].rate)
	                if (result[key].rate > 70) {
	                    if (i == 20) {
	                        break;
	                    } else {
	                        i++;
	                    }
	                }
	            }
	            showPage(items[0]);
	            for (let item of items) {
	                item.addEventListener('click', function () {
	                    showPage(this);
	                });
	            }
	
	            function showPage(item) {//это начало функции заполнения страниц
	                let active = document.querySelector('#pagination li.active')
	                if (active) {
	                    active.classList.remove('active');
	                }
	                item.classList.add('active');
	                let pageNum = +item.innerHTML;
	                let start = (pageNum - 1) * notesOnPage;
	                let end = start + notesOnPage;
	                let notes = result.slice(start, end);
	                console.log(notes);
	                table.innerHTML = '';
	                let tab;
	                for (let note in notes) {
	                    tab = document.createElement('tr');
	
	                    tab.innerHTML = `
						
						<tr>
						<td>${notes[note].name}</td>
						<td>${notes[note].typeObject}</td>
						<td>${notes[note].address}</td>
						<td><span class="badge badge-light m-3">★${notes[note].rate}</span></td>
						<button class=" buttab btn btn-light m-3">выбрать</button>
						</tr>
						
						`
	                    table.append(tab);
	                }
*/
	
	                let button_choose = document.getElementsByClassName('buttab');//вот тут начинается функция по клику на кнопку выбрать
	                for (let element of button_choose) {
	                    element.onclick = () => {
	
	                        card1.innerHTML = '';
	                        let obXhr = new XMLHttpRequest();
	                        obXhr.open('GET', `fail.json`);
	
	                        obXhr.send();
	
	                        obXhr.onreadystatechange = function () {
	                            if (obXhr.readyState != 4) return;
	                            if (obXhr.status != 200) {
	                                alert('Сервер недоступен ' + obXhr.status + ' ' + obXhr.statusText);
	                                return;
	                            }
	
	                            if (obXhr.response) {
	
	                                let card1 = document.getElementById('card1');
	                                let result1 = JSON.parse(obXhr.response);
	                                let ca1;
	                                document.addEventListener('click', function (e) {
	                                    if (e.target.classList.contains("increase")) {
	                                        if (e.target.parentElement.querySelector('input').value <= 9)
	                                            ++e.target.parentElement.querySelector('input').value;
	                                    } else if (e.target.classList.contains("decrease")) {
	                                        if (e.target.parentElement.querySelector('input').value > 0) {
	                                            --e.target.parentElement.querySelector('input').value;
	                                        }
	                                    }
	                                })
	                                console.log(element.parentNode)
	
	                                // 		for (let i=0; i<element.parentNode.childNodes.length; i++){
	                                let name_pr = String(element.parentNode.parentNode.firstElementChild.innerHTML);
	                                // 		}
	                                let type_pr = String(element.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML);
	
	                                let address_pr = String(element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML);
	
	
	                                console.log(name_pr);
	                                console.log(type_pr);
	                                console.log(address_pr);
	
	
	                                let need_obj
	
									arr_top_20.forEach(element => {
	                                    if ((element.name == name_pr) && (element.typeObject == type_pr) && (element.address == address_pr)) {
	                                        need_obj = element;
	                                    }
	                                })
	                                
	                                arr_price = Object.values(need_obj).slice(15);
	
	                                console.log(need_obj)
	                                console.log(arr_price)
	
	
	                                for (let i = 0; i < result1.length; i++) {
	                                    console.log(result1[i])
	                                    ca1 = document.createElement('div');
	                                    ca1.innerHTML = `
										
										<div class="card card1 d-flex justify-content-center align-items-center m-3" style="background-color:#ebd7e1;" >
										<div class="card-body">
										<div class="container " name="cardDish">
										<img src="${result1[i].image}" class="imgmen">
	                                    <div><h5>${result1[i].name}</h5> </div>
	                                    <div><h5>Цена: ${arr_price[i]}</h5> </div>
										<div><h6 style="color: black">${result1[i].description}</h6></div>
										<button class=" btn btn-light m-3" type="button" onclick="minus(${i})"><span class="minus">-</span></button>
										<input class="input-group-text" type="text" value="0" name="count" id="count${i}"	size="20" class="inpmen"/>
										<input type="hidden" value="${arr_price[i]}" name="${result1[i].name}"/>
										<button class=" btn btn-light m-3" type="button" onclick="plus(${i})"><span class="plus">+</span></button>
										</div>
										</div>
										</div>
										</div>
										
										
										`
	                                    document.getElementById('card1').append(ca1);
	
	                                }
	                            }
	                        }
	                    }
	                }//тут заканчивается цикл перебора всех кнопок выбрать
	
	
	            }
	
	            
	            let select1;
	            let okrug = result.map(Area => {
	                return Area.admArea;
	            });
	            var uniqueArray = [];
	            var count = 0;
	            var found = false;
	            for (let i = 0; i < okrug.length; i++) {
	                for (let y = 0; y < uniqueArray.length; y++) {
	                    if (okrug[i] == uniqueArray[y]) {
	                        found = true;
	                    }
	                }
	                count++;
	                if (count == 1 &&
	
	                    found == false) {
	                    uniqueArray.push(okrug[i]);
	                }
	                count = 0;
	                found = false;
	            }
	            console.log(uniqueArray);
	            for (let key in uniqueArray) {
	                console.log(uniqueArray[key]);
	
	                select1 = document.createElement('option');
	
	                select1.innerHTML = `
					
					<select>
					<option value="${uniqueArray[key]}">${uniqueArray[key]}</option>
					</select>
					
					`
	                sel1.append(select1);
	            }
	            let select2;
	            let dist = result.map(District => {
	                return District.district;
	            });
	            var uniqueArray1 = [];
	            var count = 0;
	            var found = false;
	            for (let i = 0; i < dist.length; i++) {
	                for (let y = 0; y < uniqueArray1.length; y++) {
	                    if (dist[i] == uniqueArray1[y]) {
	                        found = true;
	                    }
	                }
	                count++;
	                if (count == 1 && found == false) {
	                    uniqueArray1.push(dist[i]);
	                }
	                count = 0;
	                found = false;
	            }
	            console.log(uniqueArray1);
	            for (let key in uniqueArray1) {
	                console.log(uniqueArray1[key]);
	
	                select2 = document.createElement('option');
	
	                select2.innerHTML = `
					
					<select>
					<option value="${uniqueArray1[key]}">${uniqueArray1[key]}</option>
					</select>
					
					`
	                sel2.append(select2);
	            }
	            let select3;
	            let type = result.map(Type => {
	                return Type.typeObject;
	            });
	            var uniqueArray2 = [];
	            var count = 0;
	            var found = false;
	            for (let i = 0; i < type.length; i++) {
	                for (let y = 0; y < uniqueArray2.length; y++) {
	                    if (type[i] == uniqueArray2[y]) {
	                        found = true;
	                    }
	                }
	                count++;
	                if (count == 1 && found == false) {
	                    uniqueArray2.push(type[i]);
	                }
	                count = 0;
	                found = false;
	            }
	            console.log(uniqueArray2);
	            for (let key in uniqueArray2) {
	                console.log(uniqueArray2[key]);
	
	                select3 = document.createElement('option');
	
	                select3.innerHTML = `
					
					<select>
					<option value="${uniqueArray2[key]}">${uniqueArray2[key]}</option>
					</select>
					
					`
	                sel3.append(select3);
	            }
	            let select4;
	            let soc = result.map(Soc => {
	                return Soc.socialPrivileges;
	            });
	            var uniqueArray3 = [];
	            var count = 0;
	            var found = false;
	            for (let i = 0; i < soc.length; i++) {
	                for (let y = 0; y < uniqueArray3.length; y++) {
	                    if (soc[i] == uniqueArray3[y]) {
	                        found = true;
	                    }
	                }
	                count++;
	                if (count == 1 && found == false) {
	                    uniqueArray3.push(soc[i]);
	                }
	                count = 0;
	                found = false;
	            }
	            console.log(uniqueArray3);
	            for (let key in uniqueArray3) {
	                if (uniqueArray3[key] == 1) {
	                    console.log(uniqueArray3[key]);
	
	
	                    select4 = document.createElement('option');
	
	                    select4.innerHTML = `
					
					<select>
					<option value="Есть">Есть</option>
					</select>
					
					`
	                    sel4.append(select4);
	                }
	                if (uniqueArray3[key] == 0) {
	                    select4 = document.createElement('option');
	
	                    select4.innerHTML = `
					
					<select>
					<option value="Нет">Нет</option>
					</select>
					
					`
	                    sel4.append(select4);
	
	                }
	            }
	              let result1 = JSON.parse(obXhr.response);
	            let ca1;
	
	
	            //начало филтрации
	            document.getElementById("butN").onclick = () => {
	
	
	                table.innerHTML = '';
	                document.querySelector('#pagination').innerHTML = '';
	
	
	                let okrug = document.getElementById("sel1").value;
	                let dist = document.getElementById("sel2").value;
	                let type = document.getElementById("sel3").value;
	                let soc = document.getElementById("sel4").value;
	
	
	                let arr_print = result1.filter((element) => {
	                    if ((element.admArea == okrug) || (okrug == "не выбрано"))
	                        if (dist == element.district || dist == "не выбрано")
	                            if (type == element.typeObject || type == "не выбрано")
	                                if ((element.socialPrivileges == 1) || (element.socialPrivileges == 0) || (soc == "не выбрано")) {
	                                    // 							k++;
	                                    return element;
	                                }
	
	                }).sort((a, b) => a.rate < b.rate ? 1 : -1);//конец фильтрации массива по нашим параметрам + отсортировано по убыванию рейтинга
	                console.log(arr_print);
	
	
	                let notesOnPage = 5;
	                let countOfItems = Math.ceil(arr_print.length / notesOnPage);
	                let tab;
	                let i = 0;
	                let items = [];
	
	                for (let i = 1; i <= countOfItems; i++) {
	                    let but = document.createElement('button');
	                    but.innerHTML = i;
	                    pagination.appendChild(but);
	                    items.push(but);
	                }
	
	                result.sort(function (a, b) {
	                    return b.rate - a.rate
	                });
	                /*
	                    for(let key in result){
	                    console.log(result[key].rate)
	                    if (result[key].rate>70){
	                    if(i==20){break;}
	                    else{i++;}
	                    }
	                    }
	                */
	                showPage(items[0]);
	                for (let item of items) {
	                    item.addEventListener('click', function () {
	                        showPage(this);
	                    });
	                }
	
	                function showPage(item) {//это начало функции заполнения страниц
	                    let active = document.querySelector('#pagination li.active')
	                    if (active) {
	                        active.classList.remove('active');
	                    }
	                    item.classList.add('active');
	                    let pageNum = Number(item.innerHTML);
	                    let start = (pageNum - 1) * notesOnPage;
	                    let end = start + notesOnPage;
	                    let notes = arr_print.slice(start, end);
	                    console.log(notes);
	                    table.innerHTML = '';
	                    let tab;
	                    for (let note in notes) {
	                        tab = document.createElement('tr');
	
	                        tab.innerHTML = `
							
							
							<td>${notes[note].name}</td>
							<td>${notes[note].typeObject}</td>
							<td>${notes[note].address}</td>
							<td><span class="badge badge-light m-3">★${notes[note].rate}</span></td> 
							<button class="buttab btn btn-light m-3">выбрать</button>
							
							
							`
	                        table.append(tab);
	                    }
	
	                    let button_choose = document.getElementsByClassName('buttab');//вот тут начинается функция по клику на кнопку выбрать
	                    for (let element of button_choose) {
	                        element.onclick = () => {
	
	                            card1.innerHTML = '';
	                            let obXhr2 = new XMLHttpRequest();
	                            obXhr2.open('GET', `fail.json`);
	
	                            obXhr2.send();
	
	                            obXhr2.onreadystatechange = function () {
	                                if (obXhr2.readyState != 4) return;
	                                if (obXhr2.status != 200) {
	                                    alert('Сервер недоступен ' + obXhr.status + ' ' + obXhr.statusText);
	                                    return;
	                                }
	
	                                if (obXhr2.response) {
	                                    // 	console.log(JSON.parse(obXhr2.response));
	
	
	                                    let result_menu = JSON.parse(obXhr2.response);
	                                    console.log("тут была");
	                                    let ca1;
	
	                                    /*
	                                        let result_menu = JSON.parse(obXhr2.response).map(elem=>(
	                                        {
	                                        name: elem.name ,
	                                        picture: elem.image ,
	                                        description: elem.description
	                                        }));
	                                        console.log("тут был");
	                                    */
	                                    /*
	                                        document.addEventListener('click', function (e) {
	                                        if (e.target.classList.contains("increase")) {
	                                        if(e.target.parentElement.querySelector('input').value<=9)
	                                        ++e.target.parentElement.querySelector('input').value;
	                                        }
	                                        else if (e.target.classList.contains("decrease")) {
	                                        if(e.target.parentElement.querySelector('input').value>0){
	                                        --e.target.parentElement.querySelector('input').value;
	                                        }
	                                        }
	                                        })
	                                    */
	
	                                    //  console.log(result_men);
	
	
	                                    console.log(element.parentNode)
	
	                                    // 		for (let i=0; i<element.parentNode.childNodes.length; i++){
	                                    let name_pr = String(element.parentNode.firstElementChild.innerHTML);
	                                    // 		}
	                                    let type_pr = String(element.parentNode.firstElementChild.nextElementSibling.innerHTML);
	
	                                    let address_pr = String(element.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML);
	
	
	                                    console.log(name_pr);
	                                    console.log(type_pr);
	                                    console.log(address_pr);
	
	
	                                    let need_obj
	
	                                    arr_print.forEach(element => {
	                                        if ((element.name == name_pr) && (element.typeObject == type_pr) && (element.address == address_pr)) {
	                                            need_obj = element;
	                                        }
	                                    })
	                                    updateRest(need_obj);
	                                    arr_price = Object.values(need_obj).slice(15);
	
	                                    console.log(need_obj)
	                                    console.log(arr_price)
	
	
	                                    for (let i = 0; i < result_menu.length; i++) {
	                                        console.log(result_menu[i])
	                                        ca1 = document.createElement('div');
	                                        ca1.innerHTML = `
											
											<div class="card card1" style="background-color:#ebd7e1;" >
	                                        <div class="card-body">
	                                        <div class="container " name="cardDish">
	                                        <img src="${result_menu[i].image}" class="imgmen">
	                                        <div><h5>${result_menu[i].name} </h5> </div>
	                                        <div><h5>Цена: ${arr_price[i]}</h5> </div>
	                                        <div><h6 style="color:white">${result_menu[i].description}</h6></div>
	                                        <button type="button" onclick="minus(${i})" ><span class="minus">-</span></button>
	                                        <input type="text" value="0" name="count" id="count${i}"	size="20" class="inpmen"/>
	                                        <input type="hidden" value="${arr_price[i]}" name="${result_menu[i].name}"/>
	                                        <button type="button" onclick="plus(${i})" ><span class="plus">+</span></button>
	                                        </div>
	                                        </div>
	                                        </div>
	                                        </div>
											
											
											`
	                                        document.getElementById('card1').append(ca1);
	
	                                    }
	                                }
	                            }
	                        }
	                    }//тут заканчивается цикл перебора всех кнопок выбрать
	
	
	                }//клик по кнопке Найти
	
	
	            }
	        }//конец функции при загрузке странцицы


    	}//конец проверки ответа от сервера(работы с основным массивом)
	document.addEventListener('DOMContentLoaded', loadFunc());

	}//конец onReadystate





