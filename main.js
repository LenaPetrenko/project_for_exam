let need_obj;
let table = document.getElementById('tb2');
let sel1 = document.getElementById('sel1');
let sel2 = document.getElementById('sel2');
let sel3 = document.getElementById('sel3');
let sel4 = document.getElementById('sel4');
let card1 = document.getElementById('card1');
let items = document.querySelector('#pagination');



function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};




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
	    // заполнение селектов
    	let result = JSON.parse(obXhr.response);//главный массив - получаем один раз
		function loadFunc() {  
			let unique_admArea = unique(result.map(Area => {return Area.admArea;}));//только округа 
			let unique_district = unique(result.map(District => {return District.district;}));
			let unique_typeObject = unique(result.map(Type => {return Type.typeObject;}));
			
			unique_admArea.forEach(element => {
				let admAreaOption = document.createElement('option');//вносим каждый уникальный эл в селект
				admAreaOption.innerHTML = `${String(element)}`;
				document.getElementById('sel1').append(admAreaOption);	
			});
			unique_district.forEach(element => {
				let districtOption = document.createElement('option');
				districtOption.innerHTML = `${String(element)}`;
				document.getElementById('sel2').append(districtOption);
			});
			unique_typeObject.forEach(element => {
				let typeObjectOption = document.createElement('option');
				typeObjectOption.innerHTML = `${String(element)}`;
				document.getElementById('sel3').append(typeObjectOption);
			});
				
				
				
			let arr_sort = result.sort((a, b) => a.rate < b.rate ? 1 : -1);	
				
			let arr_top_20 = [];	
				
				
			for (let i = 0; i < 20; i++){//выводим начиная 20 элементов с конца в отсортированном массиве
				arr_top_20.push(arr_sort[i]);//выводишь	
				
			}	
				
			let update_page = true;
			
			const notesOnPage = 5; //сколько записей на каждой стр
			const countOfPages = Math.ceil(arr_top_20.length / notesOnPage); //кол-во стр
			
			
			let pag_div = document.createElement("div");
			pag_div.id = "pagination"		
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
			
			
			document.querySelector('#pagination').append(pag_div);//осуществили вставку пагинационной панели
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
			    }).join('')//вставляем на каждую страницу данные
				
				
				

	
	            let button_choose = document.getElementsByClassName('buttab');//вот тут начинается функция по клику на кнопку выбрать
	            for (let element of button_choose) {
	                element.onclick = () => {
	
	                    card1.innerHTML = '';
	                    let obXhr = new XMLHttpRequest();
	                    obXhr.open('GET', `fail.json`);//обращение к файлу json
	
	                    obXhr.send();
	
	                    obXhr.onreadystatechange = function () {//проверки на состояние на получение 
	                        if (obXhr.readyState != 4) return;
	                        if (obXhr.status != 200) {
	                            alert('Сервер недоступен ' + obXhr.status + ' ' + obXhr.statusText);
	                            return;
	                        }
	
	                        if (obXhr.response) {//есть ли ответ от файла
	
	                            let card1 = document.getElementById('card1');
	                            let result1 = JSON.parse(obXhr.response);//массив блюд
	                            let ca1;

	                            let name_pr = String(element.parentNode.parentNode.firstElementChild.innerHTML); // делаем обращение к родителю кнопки и находим название ресторана
	                                
	                            let type_pr = String(element.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML);
	
	                            let address_pr = String(element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML);
	
	
	                            console.log(name_pr);
	                            console.log(type_pr);
	                            console.log(address_pr);
	
	

	
							    arr_top_20.forEach(element => {
	                                if ((element.name == name_pr) && (element.typeObject == type_pr) && (element.address == address_pr)) {
	                                  need_obj = element;
	                                }
	                            })//перебор массива 20 первых значений (находим выбранное значение)
	                                
                                arr_price = Object.values(need_obj).slice(12);//массив цен у выбранного объекта

                                console.log(need_obj)
                                console.log(arr_price)


                                for (let i = 0; i < result1.length; i++) {//цикл для вывода в документ меню и соответств цен
                                    console.log(result1[i])
                                    ca1 = document.createElement('div');
                                    ca1.className = "col-md-4";
                                    ca1.innerHTML = `
									<div class="card card1 d-flex justify-content-center align-items-center m-3" style="background-color:#ebd7e1;" >
									  <div class="card-body">
									    <div class="container " name="cardDish">
									      <img src="${result1[i].image}" class="bd-placeholder-img card-img-top" width="100%" height="200">
                                          <div><h5>${result1[i].name}</h5></div>
                                          <div><h5>Цена: ${arr_price[i]}</h5> </div>
										  <div class="row" style = "height:70px;"><h6 style="color: black">${result1[i].description}</h6></div>
										  <div class="btn-group">
											<div class="input-group input-group-sm mb-3">
											  <div class="input-group-prepend">
							    				<button type="button" class=" decrease btn btn-sm btn-outline-secondary" >-</button>
											  </div>
							  				  <input type="text" class="form-control" readonly aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="2" style=" background: white; border: 1px solid #6b6a6a; " value="0">
							  				  <div class="input-group-append">
							    				<button type="button" class=" increase btn btn-sm btn-outline-secondary" >+</button>
							  				  </div>
							  				</div>
							              </div>
										</div>
									  </div>
									</div>
									`
                                    document.getElementById('card1').append(ca1);

                                }
	                        }
	                    }
	                }//конец на клик выбрать
	            }//тут заканчивается цикл перебора всех кнопок выбрать
	
	
	        }//конец пагинационной функции
		}//конец функции при загрузке странцицы
	            

        let ca1;

		let itog = 0; //переменая для вывод общих цен по категориям
		let itog_options = 0; //цена с приминением опций
				
        //начало филтрации
        document.getElementById("filterButton").onclick = () => {//записала функцию в событие на нажатие кнопки фильтра

			document.getElementById('card1').innerHTML = '';

            table.innerHTML = '';
            document.querySelector('#pagination').innerHTML = '';



            let okrug = document.getElementById("sel1").value;
            let dist = document.getElementById("sel2").value;
            let type = document.getElementById("sel3").value;
            let soc = document.getElementById("sel4").value;


            let arr_print = result.filter((element) => { //перебор каждго элемента и проверка на соотв с селектами
                if ((element.admArea == okrug) || (okrug == "не выбрано"))
                    if (dist == element.district || dist == "не выбрано")
                        if (type == element.typeObject || type == "не выбрано")
                            if ( ((element.socialPrivileges == 1) && (soc == "Есть")) || ((element.socialPrivileges == 0) && (soc == "Нет" )) || (soc == "не выбрано")) {
                                return element;
                            }

            }).sort((a, b) => a.rate < b.rate ? 1 : -1);//конец фильтрации массива по нашим параметрам + отсортировано по убыванию рейтинга
            console.log(arr_print);


            let update_page = true;
			
			
			
			
			
			
			
			const notesOnPage = 5;
			const countOfPages = Math.ceil(arr_print.length / notesOnPage);
			
			
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
			    document.getElementById('tb2').innerHTML = arr_print.slice((page - 1) * notesOnPage, page * notesOnPage).map((element) => {
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

                                
                                let name_pr = String(element.parentNode.parentNode.firstElementChild.innerHTML);
                                
                                let type_pr = String(element.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML);

                                let address_pr = String(element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML);


                                console.log(name_pr);
                                console.log(type_pr);
                                console.log(address_pr);


                                

								arr_print.forEach(element => {
                                    if ((element.name == name_pr) && (element.typeObject == type_pr) && (element.address == address_pr)) {
                                        need_obj = element;
                                    }
                                })
                                
                                arr_price = Object.values(need_obj).slice(12);

                                console.log(need_obj)
                                console.log(arr_price)


                                for (let i = 0; i < result1.length; i++) {
                                    console.log(result1[i])
                                    ca1 = document.createElement('div');
                                    ca1.className = "col-md-4";
                                    ca1.innerHTML = `
									<div class="card card1 d-flex justify-content-center align-items-center m-3" style="background-color:#ebd7e1;" >
									  <div class="card-body">
									    <div class="container " name="cardDish">
									      <img src="${result1[i].image}" class="bd-placeholder-img card-img-top" width="100%" height="200">
                                          <div><h5>${result1[i].name}</h5></div>
                                          <div><h5>Цена: ${arr_price[i]}</h5> </div>
										  <div class="row" style = "height:70px;"><h6 style="color: black">${result1[i].description}</h6></div>
										  <div class="btn-group">
											<div class="input-group input-group-sm mb-3">
											  <div class="input-group-prepend">
							    				<button type="button" class=" decrease btn btn-sm btn-outline-secondary" >-</button>
											  </div>
							  				  <input type="text" class="form-control" readonly aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="2" style=" background: white; border: 1px solid #6b6a6a; " value="0">
							  				  <div class="input-group-append">
							    				<button type="button" class=" increase btn btn-sm btn-outline-secondary" >+</button>
							  				  </div>
							  				</div>
							              </div>
										</div>
									  </div>
									</div>
									`
                                    document.getElementById('card1').append(ca1);

                                }
                            }
                        }
                    }//конец на клик выбрать
                }//тут заканчивается цикл перебора всех кнопок выбрать
			}//конец пагинационной функции
	    }//клик по кнопке Найти
	
	
	
		
		
		
		
		
		
		
		document.addEventListener('click', function (e) {
			  					
			if (e.target.classList.contains("increase")) {
				  					
				let elements_price = document.getElementsByName('itog');
				for (let el of elements_price) {
			  		el.innerHTML = "";
			  	}
			  	
				let all_price = Number(String(e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.innerHTML).substr(6));
				console.log("Ценник блюда");
				console.log(all_price);	
				++e.target.parentElement.parentElement.querySelector("input").value;
				itog += all_price;
			  	console.log("Итого");
			  	console.log(itog);
			  	
			  	
			  	
			  	for (let el of elements_price) {
	// 			  	getCheckbox('gridRadios');
			  		pItem = document.createElement('p');
			  		pItem.innerHTML = `<big>Итого: ${itog}<big>`;
			  		el.append(pItem)
			  	}
	  		}
	  		
	  		else if (e.target.classList.contains("decrease")) {
		  		if(e.target.parentElement.parentElement.querySelector("input").value > 0) {
			  		let elements_price = document.getElementsByName('itog');
				  	for (let el of elements_price) {
			  			el.innerHTML = "";
			  		}
		  										  					
  								  					
		  			let all_price =Number(String(e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.innerHTML).substr(6));
				  	console.log("Ценник блюда");
				  	console.log(all_price);			  					
		  			--e.target.parentElement.parentElement.querySelector("input").value;
		  			itog -= all_price;
		  			console.log("Итого");
		  			console.log(itog);	
	

					
					
					for (let el of elements_price) {
			  			
			  			
			  						
		  				pItem = document.createElement('p');
						pItem.innerHTML = `<big>Итого: ${itog}</big>`;
						el.append(pItem)
			  		}
	
	
		  								
		  		}
	  		}//если нажатой кнопкой является минус (в меню)
	  	});// конец события на нажатия кнопки +/- в  меню
  	
	  let CheckBox = document.querySelectorAll('input[name="gridRadios"]')
		
		
		for (let i = 0; i < CheckBox.length; i++) {
			  		
			
			CheckBox[i].onclick = () =>  {
				
				
				
				let elements_price = document.getElementsByName('itog');
					
					
				if (CheckBox[i].checked) {
					
						if(itog_options == 0)
							itog_options = itog;		      
					
					if (CheckBox[i].value == "option1"){
						for (let el of elements_price) {
							el.innerHTML = "";
			  			}
						itog_options = itog - (itog * need_obj.socialDiscount/100);
						for (let el of elements_price) {
							el.innerHTML = "";
							pItem = document.createElement('p');
							pItem.innerHTML = `<big>Итого: ${Math.ceil(itog_options)}</big>`;
							el.append(pItem)
			  			}
						
						
						
						let divItem_choosed_options = document.createElement('div');
						divItem_choosed_options.className = "row";
						
						divItem_choosed_options.innerHTML = 
												`<div class="col-5 themed-grid-col" align="left">Соц. скидка</div>
												
												<div class="col-4 themed-grid-col" name="pos_6" align="left">-${need_obj.socialDiscount}%</div>
												<div class="col-3 themed-grid-col" align="center" >${Math.ceil(itog_options)}руб.</div>
	
												
									`;
						document.getElementById('option1_1').append(divItem_choosed_options);
						
						if(document.getElementById('up_20') != null ){
							document.getElementById('up_20').innerHTML = "";
							document.getElementById('up_20').innerHTML = `${Math.ceil(itog_options*1.2)}`;
						}
						
					}	
						
					if (CheckBox[i].value == "option2"){
						console.log(CheckBox[i].value);
						for (let el of elements_price) {
							el.innerHTML = "";
			  			}
						
						
						
						let divItem_choosed_options2 = document.createElement('div');
						divItem_choosed_options2.className = "row";
						
						divItem_choosed_options2.innerHTML = 
												`<div class="col-5 themed-grid-col text-danger" align="left">Быстрая доставка</div>
												
												<div class="col-4 themed-grid-col" name="pos_7" align="left">+20%</div>
												<div class="col-3 themed-grid-col" align="center" id="up_20">${Math.ceil(itog_options*1.2)}руб.</div>
	
									`
						document.getElementById('option2_1').append(divItem_choosed_options2);
	
						for (let el of elements_price) {
							el.innerHTML = "";
							pItem = document.createElement('p');
							pItem.innerHTML = `<big>Итого: ${Math.ceil(itog_options*1.2)}</big>`;
							el.append(pItem)
			  			}
						
					}	
				}
				else{
					if (CheckBox[i].value == "option1"){
						document.getElementById('option1_1').innerHTML = "";
	
						itog_options += (itog * need_obj.socialDiscount/100);
						for (let el of elements_price) {
							el.innerHTML = "";
							pItem = document.createElement('p');
							pItem.innerHTML = `<big>Итого: ${Math.ceil(itog_options)}</big>`;
							el.append(pItem)
			  			}
			  			
			  			if(document.getElementById('up_20') != null ){
							document.getElementById('up_20').innerHTML = "";
							document.getElementById('up_20').innerHTML = `${Math.ceil(itog_options*1.2)}`;
						}		  			
			  			
					}
						
					if (CheckBox[i].value == "option2"){
						for (let el of elements_price) {
							el.innerHTML = "";
			  			}
						console.log("отмена" + CheckBox[i].value);
						document.getElementById('option2_1').innerHTML = "";
						
						for (let el of elements_price) {
							el.innerHTML = "";
							pItem = document.createElement('p');
							pItem.innerHTML = `<big>Итого: ${Math.ceil(itog_options)}</big>`;
							el.append(pItem)
			  			}
					}
				}
			}
	
		}

		document.getElementById('modal_window').onclick = () => {
			
			document.getElementById('modal_positions').innerHTML = "";	
			document.getElementById('modal_name').innerHTML="";
			document.getElementById('modal_admArea').innerHTML="";
			document.getElementById('modal_district').innerHTML="";
			document.getElementById('modal_address').innerHTML="";
			document.getElementById('modal_rate').innerHTML="";						
						
			pItem_modal_address = document.createElement('p');
			pItem_modal_address.innerHTML = `<small class="text-muted">${String(need_obj.address)}</small>`;
									
			pItem_modal_rate = document.createElement('p');
			pItem_modal_rate.innerHTML =    `★${String(need_obj.rate)}`;
	
							
							
			document.getElementById('modal_name').append(`${String(need_obj.name)}`);
			document.getElementById('modal_admArea').append(`${String(need_obj.admArea)}`);
			document.getElementById('modal_district').append(`${String(need_obj.district)}`);
			document.getElementById('modal_address').append(pItem_modal_address);
			document.getElementById('modal_rate').append(pItem_modal_rate);
			
			let elements_menu_for_modal = document.getElementsByClassName('increase');
			for (let elem of elements_menu_for_modal ) {
				let kol = elem.parentElement.parentElement.querySelector("input").value;
				let meal = elem.parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.lastElementChild.innerHTML
				
				
				console.log(kol);
				console.log(meal);
				
				
				
				if(kol > 0){
				divItem_choosed_food = document.createElement('div');
				divItem_choosed_food.className = "row";
				divItem_choosed_food.innerHTML = `<div class="col-6 themed-grid-col" align="left">${meal} x${kol}</div>`;
				document.getElementById('modal_positions').append(divItem_choosed_food);
								
			}

				
				
			}
			
			
		};

    }//конец проверки ответа от сервера(работы с основным массивом)
	document.addEventListener('DOMContentLoaded', loadFunc());//вызываем функуию при загрузке стр

	}//конец onReadystate





