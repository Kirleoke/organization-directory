<template>
  <div>
    <div class="table-container">
      <input v-model="searchQuery" placeholder="Найти по ФИО..." class="search-input"/>
      <div>
        <button @click="showAddModal = true" class="add-button">Добавить</button>
      </div>
      <AddOrganizationModal v-if="showAddModal"
                            @add="addOrganization" @close="showAddModal = false" />
    </div>
    <table class="organization-table">
      <thead>
      <tr class="columns">
        <th class="column-name" @click="sortBy('name')">
          Название организации
          <span class="sort-arrow" v-if="sortKey === 'name'">
            <img :src="require('@/assets/images/strelka.png')"
                 :class="sortAsc ? 'arrow-up' : 'arrow-down'" alt="сортировка">
          </span>
        </th>
        <th class="column-name" @click="sortBy('director')">
          ФИО директора
          <span class="sort-arrow" v-if="sortKey === 'director'">
            <img :src="require('@/assets/images/strelka.png')"
                 :class="sortAsc ? 'arrow-up' : 'arrow-down'" alt="сортировка">
          </span>
        </th>
        <th>Номер телефона</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(org, index) in paginatedOrganizations" :key="org.id">
        <td>{{ org.name }}</td>
        <td>{{ org.director }}</td>
        <td>{{ org.phone }}</td>
        <td><button @click="removeOrganization(index)" class="delete-button">X</button></td>
      </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">
        <img :src="require('@/assets/images/strelka.png')"
             alt="предыдущая" class="pagination-img" id="back">
      </button>
      <span>Страница {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">
        <img :src="require('@/assets/images/strelka.png')"
             alt="следущая" class="pagination-img" id="forward">
      </button>
    </div>
  </div>
</template>

<script>
import AddOrganizationModal from './AddOrganizationModal.vue';

export default {
  name: 'OrganizationTable',
  components: { AddOrganizationModal },
  data() {
    return {
      organizations: [],
      searchQuery: '',
      sortKey: '',
      sortAsc: true,
      currentPage: 1,
      perPage: 10,
      showAddModal: false,
    };
  },
  computed: {
    filteredOrganizations() {
      // eslint-disable-next-line max-len
      const result = this.organizations.filter((org) => org.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        || org.director.toLowerCase().includes(this.searchQuery.toLowerCase())
        || org.phone.includes(this.searchQuery));
      if (this.sortKey) {
        result.sort((a, b) => {
          const keyA = a[this.sortKey].toLowerCase();
          const keyB = b[this.sortKey].toLowerCase();
          if (keyA < keyB) return this.sortAsc ? -1 : 1;
          if (keyA > keyB) return this.sortAsc ? 1 : -1;
          return 0;
        });
      }
      return result;
    },
    paginatedOrganizations() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredOrganizations.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredOrganizations.length / this.perPage);
    },
  },
  created() {
    this.loadOrganizations();
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
    removeOrganization(index) {
      const start = (this.currentPage - 1) * this.perPage;
      this.organizations.splice(start + index, 1);
      this.saveOrganizations();
    },
    prevPage() {
      if (this.currentPage > 1) {
        // eslint-disable-next-line no-plusplus
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        // eslint-disable-next-line no-plusplus
        this.currentPage++;
      }
    },
    addOrganization(newOrg) {
      this.organizations.push(newOrg);
      this.showAddModal = false;
      this.saveOrganizations();
    },
    saveOrganizations() {
      localStorage.setItem('organizations', JSON.stringify(this.organizations));
    },
    loadOrganizations() {
      const data = localStorage.getItem('organizations');
      if (data) {
        this.organizations = JSON.parse(data);
      }
    },
  },
};
</script>

<style>
.table-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 50px;
  justify-content: space-between;
}

.search-input {
  max-width: 200px;
  padding: 10px;
  font-size: 16px;
}

.add-button {
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 10px;
  border: solid;
  cursor: pointer;
  transition: 0.9s;
}

.add-button:hover {
  background-color: rgba(74, 76, 74, 0.3);
  transition: 0.9s;
}

.organization-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.organization-table th, .organization-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.organization-table th {
  background-color: #f2f2f2;
  text-align: center;
}

.column-name {
  cursor: pointer;
}

.column-name:hover {
  background-color: #ddd;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: right;
}

.pagination-button {
  padding: 10px 15px;
  margin: 0 5px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  background: rgba(69, 211, 47, 0.28);
}

.pagination-button[disabled] {
  background: rgba(211, 47, 47, 0.25);
  cursor: not-allowed;
}

.pagination-img {
  width: 20px;
}

#back {
  transform: scaleX(-1);
}

.sort-arrow img {
  width: 20px;
}
.arrow-up {
  transform: rotate(90deg);
}

.arrow-down {
  transform: rotate(-90deg);
}
</style>
