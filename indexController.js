class contentController {
    constructor(){

            this.static = new Static();

            this.contents = this.static.getContent();
            this.categories = this.static.getCategories();
            this.mappedContents = [];
            this.postPerPage = 4;
    }

    renderCategoryFilter(){
        return this.categories.map((categories) => {
            $(`
                <li class="filter-btn" data-id="${ categories.id }">${categories.categoryName}</li>
            `)
            .appendTo('.category-filter');
        })
    }

    mappedCategory(){
        this.contents
            .filter(item => item.status === "published")
            .map((item , index) => {
                this.mappedContents.push(
                    {
                        ...item,
                        ID: index + 1,
                        Category: this.getCategory(item.categoryID)
                    }
                );
            });
        
    }
    
    getCategory(id){
        return this.categories.find(c => c.id === id) || null;
    }

    getCategoryFilter(){
        return {
            category: +$('.filter-btn.active').attr('data-id') ?? null
        }
    }

   

    renderContents( currentPage = 1 ){
        if (currentPage <= 1) $('#contents').html("");
        let allContents = [...this.mappedContents];

        console.log("All Contents -> " , allContents);

       


        let filteredContents = this.filterContents(allContents);
        console.log("Filtered-> " , filteredContents);


        let loadmoreContents = this.loadmoreContents(filteredContents , currentPage);
        console.log("LoadmoreContents" , loadmoreContents);


        loadmoreContents.map(content => {
            console.log(" ----" , content)
            let template = `
                            <div class="content">
                                <a href="${content.video}" target="_blank">
                                    <div class="card">
                                        <div class="card-image">
                                            <img src="${content.image} ">
                                            <div class="uk-overlay uk-overlay-default uk-position-center">
                                                <p>Play Video</p>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="category-name"> ${content.Category.categoryName}</div>
                                            <div class="title">
                                               
                                                ${content.musicTitle}
                                            </div>
                                                
                                                <div class="post-date">Posted Date: ${content.post_date}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        `
                    $(template).appendTo('#contents');
        })


        let totalPage = Math.ceil(filteredContents.length / this.postPerPage);
        console.log("Total Page -> " , totalPage);
        console.log("Current Page ->" , currentPage);
        
        if(totalPage > currentPage) $('.loadmore-wrap').show();

        else  $('.loadmore-wrap').hide();

        $('#loadmore').attr('data-page' , currentPage + 1); 
    }

    filterContents(contents){

        let filters = this.getCategoryFilter();

        if(filters.category) return contents.filter(content => content.categoryID === +filters.category);
        return contents;

    }

    loadmoreContents(contents , currentPage) {
        let startIndex = this.postPerPage * (currentPage - 1);
        let endIndex = startIndex + this.postPerPage;
        return contents.slice(startIndex, endIndex);
    }

}

$(document).ready(function(){
    
    const conController = new contentController();
    conController.renderCategoryFilter()
    conController.mappedCategory()
    conController.getCategoryFilter()
    conController.renderContents()
    // conController.filterContents()


    $('.filter-btn').click(function(){
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        conController.renderContents()

    })

    $('#loadmore').click(function(){
        let page = +$(this).attr('data-page');
        console.log("PAGE" , page)
        conController.renderContents(page);
    })

   

})
