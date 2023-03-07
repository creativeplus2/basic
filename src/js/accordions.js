export class Accordions {

   constructor() {
      this.$wrapper;
      this.$trigger;
      this.$content;
      this.init();
   }

   init() {
      document.querySelectorAll('[data-accordion]').forEach((wrapper, i) => {
         this.$wrapper = wrapper;
         this.$trigger = wrapper.querySelector(['[data-trigger]']);
         this.$content = wrapper.querySelector(['[data-content]']);
         this.addListenerClick();

         if (wrapper.hasAttribute('data-active')) {
            this._toggleAccordion();
         }
      });
   }

   addListenerClick() {
      this.$trigger.addEventListener('click', this.clickAccordion.bind(this));
   }

   clickAccordion(event) {
      event.preventDefault();
      this.$wrapper = event.target.closest('[data-accordion]')
      this.$trigger = this.$wrapper.querySelector(['[data-trigger]']);
      this.$content = this.$wrapper.querySelector(['[data-content]']);
      if(this.$trigger.classList.contains('active')){
         this.closeAllAccordions()
      }else{
         this.closeAllAccordions()
         this._toggleAccordion();
      }
   }

   closeAllAccordions(){
      this.$wrapper.parentNode.querySelectorAll('[data-accordion]').forEach((a) => {
         a.querySelector(['[data-trigger]']).classList.remove('active')
         a.querySelector(['[data-content]']).classList.remove('active')
      })
   }

   _toggleAccordion() {
      this.$trigger.classList.toggle('active');
      this.$content.classList.toggle('active');
   }
   
}