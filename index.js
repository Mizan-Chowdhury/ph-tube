const loadData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const resolve = await response.json();
  const data = resolve.data;
  displayData(data);
};

const displayData = (data) => {
  const tabContainer = document.getElementById("tab-container");
  data.forEach((category) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <a onclick="displayAllCategory('${category.category_id}')" class="tab bg-[#25252526] rounded">${category.category}</a>
        `;
    tabContainer.appendChild(newDiv);
  });
};

const displayAllCategory = async (categoryId) => {
  const cardContainer = document.getElementById("card-container");
  const errorContainer = document.getElementById("error-container");
  cardContainer.innerHTML = "";
  const response = await fetch(`
    https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const resolve = await response.json();
  const data = resolve.data;
  console.log(data.status);
  if (data.length > 0) {
    data.forEach((dataId) => {
      console.log(categoryId.length);
      console.log(dataId.status);
      const newDiv = document.createElement("div");
      const verifiedIcon = `
                <img class="inline" src="image/fi_10629607.jpg">`;
      newDiv.innerHTML = `
                    <div class="bg-base-100 h-96">
                    <div class="h-1/2">
                            <img class="rounded-xl h-full w-full" src=${
                              dataId.thumbnail
                            } alt="" />
                    </div>
                    <div class="flex gap-5 mt-5">
                        <div class="">
                            <img class="rounded-full w-12 h-12 " src=${
                              dataId.authors[0].profile_picture
                            } alt="">
                        </div>
                     <div class="space-y-2">
                        <h1 class="font-bold text-lg">${dataId.title}</h1>
                        <h2 class="">${dataId.authors[0].profile_name} <span >${
        dataId.authors[0].verified ? verifiedIcon : ""
      }
                        </span>
                          </h2>
                          <p>${dataId.others.views} views</p>
                     </div>
                    </div>
                  </div>
                    `;
      cardContainer.appendChild(newDiv);
    });
  } else {
    const newDiv2 = document.createElement("div");
    newDiv2.innerHTML = `
            <div class="">
              <div class="flex justify-center mb-5">
                <img class="" src="image/Icon.png" alt="">
              </div>
              <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here
              </h1>
            </div>
        `;
    errorContainer.appendChild(newDiv2);
  }
};

loadData();
displayAllCategory("1000");
