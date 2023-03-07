export class Tabs {

    constructor() {
       this.$wrapper;
       this.$triggers;
       this.$body;
       this.init();
    }
 
    init() {
       document.querySelectorAll('[data-tabs]').forEach((wrapper) => {
          this.$wrapper = wrapper;
          this.$triggers = [...wrapper.querySelector('[data-triggers]').children];
          this.$body = [...wrapper.querySelector('[data-body]').children];
          this.$triggers[0].classList.add('active');
          this.$body[0].classList.add('active');
          this.update();
          this.addListenerClick();
          this.addListenerHash();
       });
    }
 
    update(event) {
       const trigger = this.$wrapper.querySelector(`a[href="${window.location.hash}"]`);
       const content = this.$wrapper.querySelector(`[data-id="${window.location.hash}"]`);
 
       if (window.location.hash && trigger && content) {
 
          this.$triggers.forEach((trigger) => {
             trigger.classList.remove('active');
          });
 
          this.$body.forEach((content) => {
             content.classList.remove('active');
          });
 
          trigger.classList.add('active');
          content.classList.add('active');
       }
 
       sessionStorage.setItem("last-url", event?.oldURL);
    }
 
    addListenerClick() {
       this.$triggers.forEach(trigger => {
          trigger.addEventListener('click', this.changeTab.bind(this));
       });
    }
 
    addListenerHash() {
       window.addEventListener('hashchange', this.update.bind(this));
    }
 
    changeTab(event) {
       event.preventDefault();
 
       const trigger = event.target.closest('a[href^="#"]');
       const content = this.$wrapper.querySelector(`[data-id="${trigger.hash}"]`);
 
       this.$triggers.forEach(trigger => {
          trigger.classList.remove('active');
       });
 
       this.$body.forEach(content => {
          content.classList.remove('active');
       });
 
       trigger.classList.add('active');
       content.classList.add('active');
 
       history.replaceState(undefined, undefined, trigger.hash)
    }
 };