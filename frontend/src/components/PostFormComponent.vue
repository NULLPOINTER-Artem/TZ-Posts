<template>
  <div class="create-post">
    <form @submit.prevent="createPost" id="createPost">
      <div class="heading">
        <div class="headingLabel">
          <label for="heading">Heading</label>
        </div>
        <div class="headingInput">
          <input type="text" name="heading" id="heading" placeholder="Your heading is">
        </div>
      </div>
      <div class="description">
        <div class="descriptionLabel">
          <label for="description">Description</label>
        </div>
        <div class="descriptionInput">
          <textarea placeholder="Tell me about your house" maxlength="501" name="description"
          id="description" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="firstname">
        <div class="firstnameLabel">
          <label for="firstname">firstname</label>
        </div>
        <div class="firstnameInput">
          <input type="text" name="firstname" maxlength="20" id="firstname" placeholder="Your Firstname">
        </div>
      </div>
      <div class="lastname">
        <div class="lastnameLabel">
          <label for="lastname">lastname</label>
        </div>
        <div class="lastnameInput">
          <input type="text" name="lastname" maxlength="20" id="lastname" placeholder="Your Lastname">
        </div>
      </div>
      <div class="price">
        <div class="priceLabel">
          <label for="price">Price</label>
        </div>
        <div class="priceInput">
          <input type="number" name="price" id="price" placeholder="Enter your preferred price">
        </div>
      </div>
      <div class="address"> 
        <div class="addressLabel">
          <label for="address">Address</label>
        </div>
        <div class="addressInputs">
          <input type="text" name="country" id="country" maxlength="20"
           placeholder="Your Country">
          <input type="text" name="state" id="state" maxlength="5" 
          placeholder="Your State">
          <input type="text" name="city" id="city" maxlength="15"
           placeholder="Your City">
          <input type="text" name="street" id="street" maxlength="50"
           placeholder="Your Street">
          <input type="text" name="house" id="house" maxlength="10" 
          placeholder="Your House Number">
          <input type="number" name="zip" id="zip" maxlength="10" placeholder="Your Zip">
        </div>
      </div>
      <div class="arrayFiles">
        <div class="arrayFilesLabel">
          <label for="files">Please load your images of the house</label>
        </div>
        <div class="arrayFilesInput">
          <input type="file" name="files" id="files" multiple>
        </div>
      </div>
      <div>
        <input type="submit" name="sumbit" id="sumbit">
      </div>
    </form>
  </div>
</template>

<script>
import PostService from '../PostService.js';

export default {
    name: 'PostFormComponent',
    methods: {
      setDefaultForm(form) {
        [].forEach.call(form, (item) => {
            if (item.type != 'submit') {
              item.value = '';
            }
        });
      },
      createFormData(form) {
        const formDataOBJ = new FormData();

        let filesUploaded = document.querySelector('#files').files;

        [].forEach.call(form, (item) => {
            switch (item.name) {
                case 'files': {
                    [].forEach.call(filesUploaded, (file) => {
                        formDataOBJ.append('files', file);
                    });
                    break;
                }
                default: {
                    formDataOBJ.append(item.name, item.value);
                }
            }
        });

        return formDataOBJ;
      },
      async createPost() {
        let form = document.querySelector('#createPost').elements;

        let formData = this.createFormData(form);

        await PostService.insertPost(formData);

        this.setDefaultForm(form);
      },
    },
}
</script>

<style scoped>
  form > div {
    margin: 15px 0 0 0;
  }

  .create-post {
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
  }

  .heading {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .headingLabel {
    justify-self: end;
    margin-right: 10px;
  }

  .headingInput {
    justify-self: start;
  }

  .description {
    display: grid;
    grid-template-rows: 1fr 7fr;
  }

  .descriptionLabel {
    justify-self: center;
  }

  .descriptionInput {
    justify-self: center;
  }

  .descriptionInput textarea {
    width: 400px;
    height: 150px;
  }

  .firstname {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .firstnameLabel {
    justify-self: end;
    margin-right: 10px;
  }

  .firstnameInput {
    justify-self: start;
  }

  .lastname {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .lastnameLabel {
    justify-self: end;
    margin-right: 10px;
  }

  .lastnameInput {
    justify-self: start;
  }

  .price {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .priceLabel {
    justify-self: end;
    margin-right: 10px;
  }

  .priceInput {
    justify-self: start;
  }

  .address {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }

  .addressLabel {
    align-self: center;
  }

  .addressInputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    width: 350px;
    margin: 0 auto 0 auto;
  }

  .arrayFiles {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .arrayFilesLabel {
    align-self: center;
    justify-self: end;
    margin-right: 10px;
  }

  .arrayFilesInput {
    align-self: center;
    justify-self: start;
  }
</style>