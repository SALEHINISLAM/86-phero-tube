const categories=async()=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data= await res.json();
    //console.log(data);
    category(data.data)
}
const categoryItem=document.getElementById('category');
const category=(data)=>{
    data.forEach(datum=>{
        //console.log(datum.category_id);
        const catBtn=document.createElement('button');
        catBtn.innerHTML=`<button class="btn btn-error" id="b${datum.category_id}" onclick="loadContent('${datum.category_id}')">${datum.category}</button>`
        categoryItem.appendChild(catBtn);
    })
}

const loadContent= async (id)=>{
    //console.log(id);
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data=await res.json();
    //console.log(data);
    //console.log(id);
    videoCooking(data.data);
    const buttons=document.querySelectorAll('button');
    buttons.forEach(btn=>{
        btn.classList.remove('btn-error')
    })
    document.getElementById(`b${id}`).classList.add('btn-error');
}
loadContent('1000');
const videoContainer=document.getElementById('video-container');
const noContent=document.getElementById('no-content-container')
const videoCooking=(data)=>{
    if (data.length>0) {
        noContent.classList.add('hidden');
        videoContainer.textContent='';       
    }else{
        noContent.classList.remove('hidden');
        videoContainer.textContent='';
    }
    let num=0;
    data.forEach(datum=>{
        //console.log(datum);
        const isVerify=datum.authors[0].verified;
        let hidden;
        if (isVerify==true) {
          hidden='';
          console.log(isVerify);
        }else{
            hidden='hidden';
        }
        let time=datum.others.posted_date;
        const hour=parseInt(time/3600);
        const min=parseInt((time-(hour*3600))/60);
        const vid=document.createElement('div');
        vid.classList.add("card", "bg-base-100", "w-96", "shadow-xl")
        vid.innerHTML=`
        <figure class="px-10 pt-10">
        <img
          src="${datum.thumbnail}"
          alt=""
          class="rounded-xl w-full h-56" />
      </figure>
      <div class="w-32 max-w-44 h-6 bg-black text-white -mt-8 ml-52 rounded-md text-center">${hour}hrs ${min}min ago</div>
      <div class="flex flex-row items-center">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
            <img src="${datum.authors[0].profile_picture}" />
          </div>
        </div>
        <div class="card-body items-start text-start">
          <h2 class="card-title">${datum.title}</h2>
          <p>${datum.authors[0].profile_name} <span id="verify" class="${hidden}"><svg width="20" class="inline" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_13_938)">
<path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
<path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
</g>
<defs>
<clipPath id="clip0_13_938">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
</span> </p>
          <p>${datum.others.views} views</p>
        </div>
      </div>`
      videoContainer.appendChild(vid);
      num++;
    })
    
}

categories();

//<button class="btn btn-error">Error</button>