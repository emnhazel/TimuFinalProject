<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app :style="{ backgroundColor: '#ebebeb' }">
    <div class="home">
      <v-container fluid class="mt-7">
        <v-row>
          <v-col cols="12" sm="3">
            <v-card class="custom-card" color="white" elevation="5">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div>
                        <v-list-item-subtitle
                          class="subtitle-1 mt-6 mb-14 grey--text"
                        >
                          ENERGY USAGE
                        </v-list-item-subtitle>
                        <v-icon
                          class="mb-12"
                          style="font-size: 100px; color: #252e46"
                          >mdi-factory</v-icon
                        >
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-list-item three-line>
                    <v-list-item-content class="text-right">
                      <div>
                        <v-list-item-subtitle
                          class="subtitle-1 grey grey--text mt-6"
                          >123,456</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="grey--text mt-7"
                          >CHANGE TO</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="subtitle-1 grey grey--text"
                          >PREVIOUS MONTH</v-list-item-subtitle
                        >
                        <v-icon color="green" class="mb-2 mr-1"
                          >mdi-menu-up</v-icon
                        >
                        <span class="green-text">+30,534</span><br />
                        <span class="green--text">(3.48%)</span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-card class="custom-card" color="white" elevation="5">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div>
                        <v-list-item-subtitle
                          class="subtitle-1 mt-6 mb-14 grey--text"
                        >
                          AVERAGE ENERGY
                        </v-list-item-subtitle>
                        <v-icon
                          class="mb-12"
                          style="font-size: 100px; color: #252e46"
                          >mdi-home-lightning-bolt</v-icon
                        >
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-list-item three-line>
                    <v-list-item-content class="text-right">
                      <div>
                        <v-list-item-subtitle
                          class="subtitle-1 grey grey--text mt-6"
                          >456,789</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="grey--text mt-7"
                          >CHANGE TO</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="subtitle-1 grey grey--text"
                          >PREVIOUS MONTH</v-list-item-subtitle
                        >
                        <v-icon color="green" class="mb-2 mr-1"
                          >mdi-menu-up</v-icon
                        >
                        <span class="green-text">+18,678</span><br />
                        <span class="green--text">(1.06%)</span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3" class="mr-12">
            <v-card class="custom-card" color="white" elevation="5">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div>
                        <v-list-item-subtitle
                          class="subtitle-1 mt-6 mb-14 grey--text"
                        >
                          CUSTOMERS
                        </v-list-item-subtitle>
                        <v-icon
                          class="mb-12"
                          style="font-size: 100px; color: #252e46"
                          >mdi-account-group</v-icon
                        >
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-list-item three-line>
                    <v-list-item-content class="text-right">
                      <div>
                        <v-list-item-subtitle
                          class="subtitle-1 grey grey--text mt-6"
                          >123,456</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="grey--text mt-7"
                          >CHANGE TO</v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="subtitle-1 grey grey--text"
                          >PREVIOUS MONTH</v-list-item-subtitle
                        >
                        <v-icon color="red" class="mb-2 mr-1"
                          >mdi-menu-down</v-icon
                        >
                        <span class="green-text">-2,567</span><br />
                        <span class="green--text">(0,057%)</span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-data-table
            :headers="headers"
            :items="factories"
            :sort-by="[{ key: 'name', order: 'asc' }]"
            class="ma-3"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>FACTORY LIST</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ props }">
                    <v-btn color="primary" dark class="mb-2" v-bind="props">
                      New Item
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.company_name"
                              label="Company Name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.membership_start_date"
                              label="Membership Date"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.membership_end_date"
                              label="Membership End Date"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.number_of_employees"
                              label="Number of Employee"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.free_member"
                              label="Free Member"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon size="small" class="me-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
              <v-icon size="small" @click="showDetails(item)">mdi-eye</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
     dialogDelete: false,
     headers: [
       { title: "Company Name", align: "start", sortable: false, key: "company_name" },
       { title: "Membership Date", key: "membership_start_date", type: "Date" },
       { title: "Membership End Date", key: "membership_end_date", type: "Date" },
       { title: "Number of Employees", key: "number_of_employees", type: "number" },
       { title: "Free Member", key: "free_member", type: "boolean" },
       { title: "Actions", key: "actions", sortable: false },
     ],
      factories: [],
      editedIndex: -1,
     editedItem: {
       company_name: "",
       membership_start_date: 0,
       membership_end_date: 0,
       number_of_employees: 0,
       free_member: 0,
     }
    };
  },
  mounted() {
   
    axios.get('http://localhost:3001/factory') 
      .then(response => {
      
        this.factories = response.data; 
      })
      .catch(error => {
               console.error('Factory get error:', error);
      });
  },

  computed: {
     formTitle() {
       return this.editedIndex === -1 ? "New Item" : "Edit Item";
     },
   },

   watch: {
     dialog(val) {
       val || this.close();
     },
     dialogDelete(val) {
       val || this.closeDelete();
     },
   },

   created() {
     this.initialize();
   },

   methods: {
     initialize() {
      this.factories = [
         {
           id: 1,
           company_name: "Fabric A",
           membership_start_date: "2023-02-15",
           membership_end_date: "2024-02-15",
           number_of_employees: 150,
           free_member: true,
         },
         {
           id: 2,
           name: "Fabric B",
           date: "2023-03-20",
           dateend: "2024-03-20",
           emp: 200,
           user: false,
         },
         {
           id: 3,
           name: "Fabric C",
           date: "2023-04-25",
           dateend: "2024-04-25",
           emp: 300,
           user: true,
         },
         {
           id: 4,
           name: "Fabric D",
           date: "2023-05-10",
           dateend: "2024-05-10",
           emp: 100,
           user: false,
         },
         {
          id: 5,
          name: "Fabric E",
          date: "2023-06-05",
          dateend: "2024-06-05",
          emp: 250,
          user: true,
        },
        {
          id: 6,
          name: "Fabric F",
          date: "2023-07-15",
          dateend: "2024-07-15",
          emp: 180,
          user: false,
        },
      ];
    },
    showDetails(factories) {
      this.$router.push({ name: "FactoryDetails", params: { id: factories.id } });
    },
    editItem(item) {
      
       
      this.editedIndex = this.factories.indexOf(item);
     this.editedItem = Object.assign({}, item);
   
      this.dialog = true;
    },
    
    deleteItem(item) {
      this.editedIndex = this.factories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const response = axios.delete(`http://localhost:3001/factory/${this.editedItem.id}`)
      console.log(response)
      this.factories.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
      
        const response = axios.put(`http://localhost:3001/factory/${this.editedItem.id}`, this.editedItem)
        console.log(response)
       
        Object.assign(this.factories[this.editedIndex], this.editedItem);
      } else {
       
        const response = axios.post(`http://localhost:3001/factory`, this.editedItem)
        console.log(response)
        this.factories.push(this.editedItem);
      }
      this.close();
    },
  },

};
</script>



<style scoped>
.custom-card {
  height: 200px;
  width: 340px;
}
</style>
