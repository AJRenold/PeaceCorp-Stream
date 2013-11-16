Template.mobile_nav.helpers({
  hasCategories: function(){
    return Categories.find().count();
  },
  categories: function(){
    return Categories.find();
  },
  categoryLink: function () {
    return getCategoryUrl(this.slug);
  }
});

Template.mobile_nav.events = {
  'click .mobile-nav a':function(event){
    $('body').toggleClass('mobile-nav-open');
  }
};
