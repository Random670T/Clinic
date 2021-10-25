
<template>
  <div id="footer">
<footer>
Copyright <span>{{year}}</span>
</footer>


 </div>
</template>

<script>
export default {
  name:"Footer",
  data(){
    return{
      year:"",
    };
  },
  mounted(){
    this.year = new Date().getFullYear;

  },
  
};
</script>
   
 