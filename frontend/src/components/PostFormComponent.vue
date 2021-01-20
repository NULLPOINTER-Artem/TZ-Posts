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
          <textarea placeholder="Tell me about your house" maxlength="1001" name="description"
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
          <div>
            <input type="text" name="country" id="country" maxlength="20"
            placeholder="Your Country">
          </div>
          <div>
            <input type="text" name="state" id="state" maxlength="5" 
            placeholder="Your State">
          </div>
          <div>
            <input type="text" name="city" id="city" maxlength="15"
            placeholder="Your City">
          </div>
          <div>
            <input type="text" name="street" id="street" maxlength="50"
           placeholder="Your Street">
          </div>
          <div>
            <input type="text" name="house" id="house" maxlength="10" 
          placeholder="Your House Number">
          </div>
          <div>
            <input type="number" name="zip" id="zip" maxlength="10" placeholder="Your Zip">
          </div>
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

    font-family: Lucida Console, Courier, monospace;
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .headingLabel {
    margin-right: 10px;
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

  input {
    outline: 0;
    border-left: 0;
    border-right: 0;
    border-top: 0;
  }

  .descriptionInput textarea {
    border-top: 0;
    border-right: 0;
    width: 130%;
    height: 90%;
  }

  .firstname {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .firstnameLabel {
    margin-right: 10px;
  }

  .lastname {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lastnameLabel {
    margin-right: 10px;
  }

  .price {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .priceLabel {
    margin-right: 10px;
  }

  .address {
    display: grid;
    grid-template-rows: repeat(2, auto);
  }

  .addressLabel {
    align-self: center;
    margin: 0 0 15px 0;
  }

  @media screen and (max-width: 300px) {
    .descriptionInput textarea {
      width: 100%;
      height: calc(100% / 2);
    }

    .price {
      display: block;
    }
    .lastname {
      display: block;
    }
    .firstname {
      display: block;
    }
    .heading {
      display: block;
    }
  }

  .addressInputs {
    margin: 0 auto 0 auto;
  }

  .arrayFiles {
    margin: 20px auto 0 auto;
  }

  .arrayFilesLabel {
    margin: 0 0 10px 0;
  }
</style>