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
        <a onclick="getAllCategoryId('${category.category_id}')"
        class="tab bg-[#25252526] rounded font-semibold">${category.category}</a>
        `;
    tabContainer.appendChild(newDiv);
  });
};

const getAllCategoryId = async (categoryId) => {
  const response = await fetch(`
    https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const resolve = await response.json();
  const data = resolve.data;
  displayAllCategory(data);
  sortDataByViews(data);
};

const displayAllCategory = (data) => {
  const cardContainer = document.getElementById("card-container");
  const errorContainer = document.getElementById("error-container");
  cardContainer.innerHTML = "";
  errorContainer.innerHTML = "";
  if (data.length > 0) {
    data.forEach((dataId) => {
      const second = parseFloat(dataId.others.posted_date);
      console.log(second);
      const convartMin = (second) => {
        const min = Math.floor(second / 60);
        const perMin = min % 60;
        const hrs = Math.floor(min / 60);
        console.log(hrs, perMin);
        return `${hrs} hrs ${perMin} min ago`;
      };
      const min = convartMin(second);
      const newDiv = document.createElement("div");
      const newP = document.createElement("p");
      const time = (newP.innerText = `
      <p class="px-2 py-1 rounded  text-xs text-white absolute
      right-2 -mt-8 font-medium bg-[#171717]">${min}</p>
      `);
      const verifiedIcon = `
                <img class="inline" src="image/fi_10629607.jpg">`;
      newDiv.innerHTML = `
          <div class="bg-base-100 h-[330px] md:flex lg:flex-col">
          <div class="lg:h-2/3 md:h-[280px] h-2/3 lg:w-auto md:w-4/6 relative">
                  <img class="rounded-xl h-full w-full md:w-full" src=${
                    dataId.thumbnail
                  } alt="" />
          <div> ${second ? time : ""} </div>                            
          </div>
          <div class="flex lg:flex-row md:flex-col gap-5 mt-5 md:ml-5">
              <div>
                  <img class="rounded-full w-12 h-12 " src=${
                    dataId.authors[0].profile_picture
                  } alt="">
              </div>
           <div class="lg:space-y-2">
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
            <div class="text-center">
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
const sortDataByViews = async (allData) => {
  const sorted = await allData.sort((view1, view2) => {
    view1 = parseFloat(view1.others.views);
    view2 = parseFloat(view2.others.views);
    if (view1 > view2) {
      return -1;
    }
    if (view1 < view2) {
      return 1;
    }
    return 0;
  });
  document.getElementById("sort-btn").addEventListener("click", function () {
    displayAllCategory(sorted);
  });
};
getAllCategoryId("1000");
loadData();
