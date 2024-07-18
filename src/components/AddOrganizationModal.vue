<template>
  <div class="modal">
    <div class="modal-content">
      <span
        class="close"
        @click="$emit('close')"
        @keyup.enter="$emit('close')"
        tabindex="0"
        role="button"
        aria-label="Close modal"
      >&times;</span>
      <h2>Добавить организацию</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="org-name">
          <input placeholder="Название" type="text" id="org-name"
                 v-model="newOrg.name" required />
          </label>
        </div>
        <div class="form-group">
          <label for="org-phone">
            <input placeholder="Номер телефона" type="text" id="org-phone"
                   v-model="newOrg.phone" required />
          </label>
        </div>
        <div class="form-group">
          <label for="org-director">
          <input placeholder="ФИО директора" type="text" id="org-director"
                 v-model="newOrg.director" required />
          </label>
        </div>
        <div class="form-actions">
          <button type="button" @click="$emit('close')">Отменить</button>
          <button type="submit" :disabled="!isFormValid">ОК</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddOrganizationModal',
  data() {
    return {
      newOrg: {
        id: null,
        name: '',
        phone: '',
        director: '',
      },
    };
  },
  computed: {
    isFormValid() {
      return this.newOrg.name && this.newOrg.phone && this.newOrg.director;
    },
  },
  methods: {
    submitForm() {
      this.newOrg.id = Date.now(); // задаю уникальный ID
      this.$emit('add', this.newOrg);
      this.newOrg = {
        id: null,
        name: '',
        phone: '',
        director: '',
      };
    },
  },
};
</script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

h2 {
  margin-top: 0;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: space-around;
}

.form-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-actions button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

.form-actions button[type="submit"]:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.form-actions button[type="button"] {
  background-color: #f44336;
  color: white;
}
</style>
