const handleAllCategory = async() =>{
  
  const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await res.json();
  // console.log(data.data[0]); //All
  // console.log(data.data[1]); //Music
  // console.log(data.data[2]); //comedy
  // console.log(data.data[3]); //drawing
  const tabcontainer = document.getElementById("tab_container");

  data.data.slice(0,4).forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="loadData('${category.category_id}')" class="tab btn text-xl font-medium mb-2 ml-2">${category.category}</a><br>`;
    tabcontainer.appendChild(div);
  });
};

// show data

const loadData = async (categoryId) => {
  //console.log(categoryId);
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
  // console.log(data);
  console.log(data.authors);
  
  const cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = " "
  if(data.data.length === 0){
    const div = document.createElement('div');
    div.innerHTML = `
    <br>
    <div>
    <img class="ml-[550px]" src="Icon.png">
    <p class="text-xl text-center font-bold">Oops!! Sorry, There is no content here</p></div>
    `;
    cardContainer.innerHTML = " ";
    cardContainer.appendChild(div);
  }
  data.data.forEach((vids)=>{
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
    <figure>
      <img class="thumbnails" src=${vids.thumbnail}/>
    </figure>
    <div class="card-body">
      <h2 class="card-title font-bold">
       ${vids.title}
      </h2>
      <p>
      
      </p>
      <div class="card-footer flex justify-between mt-8">
        <div class="flex">
          <div>
            <div class="avatar">
              <div class="w-14 rounded-full mx-8">
                <img
                  src=${vids.authors[0].profile_picture}
                />
              </div>
            </div>
          </div>
          <div>
          <div class = "flex gap-2" >
            <h6 class="text-slate-500 font-medium">${vids.authors[0].profile_name}</h6>
            <span>${vids.authors[0].verified ? '<img src="Group 3.png">': ''}</span></div>
            <h3 class="text-slate-500">${vids.others.views} Views</h3>
          </div>
        </div>
      </div>
    </div>
  </div> 
    `;
   // console.log(vids.profile_picture)
  cardContainer.appendChild(div);
  })
}
handleAllCategory();
loadData(1000);