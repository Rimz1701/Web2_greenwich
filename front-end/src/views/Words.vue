<template>
  <div>
    <h1>Words</h1>
    <div class="search-bar"> 
      <input type="text" placeholder="Search words..." v-model="searchQuery" @input="filterWords" /> 
    </div>
    <div class="sort-buttons"> 
      <button @click="sortWords('english')">Sort English A-Z</button> 
      <button @click="sortWords('createdAt')">Sort by Created Date</button> 
    </div>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th><i class="united kingdom flag"></i>English</th>
          <th><i class="germany flag"></i>German</th>
          <th><i class="kr flag"></i>Korean</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, i) in filteredWords" :key="i">
          <td>{{ word.english }}</td>
          <td>{{ word.german }}</td>
          <td>{{ word.korean }}</td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
            <a :href="`/words/${word._id}`">Destroy</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'words',
  data() {
    return {
      words: [],
      searchQuery: '',
      sortKey: 'english'
    };
  },
  computed: { 
    filteredWords() {
      return this.words.filter(word => {
        return word.english.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               word.german.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               word.korean.toLowerCase().includes(this.searchQuery.toLowerCase());
      }).sort((a, b) => { 
        if (this.sortKey === 'english' || this.sortKey === 'german' || this.sortKey === 'korean') { 
          return a[this.sortKey].localeCompare(b[this.sortKey]); 
        } else { 
          return new Date(b[this.sortKey]) - new Date(a[this.sortKey]); 
        } 
      });
    }
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleteWord(id);
      this.flash('Word deleted successfully!', 'success');
      const newWords = this.words.filter(word => word._id !== id);
      this.words = newWords;
    },
    sortWords(key) {
      this.sortKey = key;
    },
    filterWords() {
      // Logic for filtering words is already handled in computed property 'filteredWords'
    }
  },
  async mounted() {
    this.words = await api.getWords();
  }
};
</script>

<style scoped> 
.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sort-buttons { 
  margin-bottom: 20px; 
} 

.sort-buttons button { 
  margin-right: 10px;
  padding: 10px 15px; 
  background-color: #007bff; 
  color: #fff; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}
   
.sort-buttons button:hover { 
  background-color: #0056b3; 
}
</style>
