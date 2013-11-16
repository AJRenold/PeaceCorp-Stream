Template.nav.helpers({
  site_title: function(){
    return getSetting('title');
  },
  intercom: function(){
    return !!getSetting('intercomId');
  },
  canPost: function(){
    return canPost(Meteor.user());
  },
  requirePostsApproval: function(){
    return getSetting('requirePostsApproval');
  },
  hasCategories: function(){
    return Categories.find().count();
  },
  categories: function(){
    return Categories.find();
  },
  categoryLink: function () {
    return getCategoryUrl(this.slug);
  },
  searchQuery: function () {
    return Session.get("searchQuery");
  },
  searchQueryEmpty: function () {
    return !!Session.get("searchQuery") ? '' : 'empty';
  }
});

Template.nav.preserve({
  'input#search': function (node) { return node.id; }
});

Template.nav.rendered=function(){

  if(!Meteor.user()){
    $('.login-link-text').text("Sign Up/Sign In");
  }else{
    $('#login-buttons-logout').before('<a href="/users/'+Meteor.user().slug+'" class="account-link button">View Profile</a>');
    $('#login-buttons-logout').before('<a href="/account" class="account-link button">Edit Account</a>');
  }
};

Template.nav.events = {
  'click #logout': function(e){
    e.preventDefault();
    Meteor.logout();
  },
  'click #mobile-menu': function(e){
    e.preventDefault();
    $('body').toggleClass('mobile-nav-open');
  },
  'click .login-header': function(e){
    e.preventDefault();
    Router.go('/account');
  },
  'keyup, change, search .search-field': function(e){
    e.preventDefault();
    var val = $('#search').val(),
        $search = $('.search');
    Session.set('searchQuery', val);
    if(val==''){
      $search.addClass('empty');
      // window.history.back();
      // actually, just do nothing and show an empty template 
    }else{
      $search.removeClass('empty');
      if(getCurrentRoute() != '/search')
        Router.go('/search');
    }  
  }
};
