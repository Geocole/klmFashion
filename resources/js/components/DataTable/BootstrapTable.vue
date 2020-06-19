<template>
  <div id="customer">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Customers</h4>
            <div class="card-tools" style="position: absolute;right: 1rem;top: .5rem;">
              <button type="button"
                class="btn btn-info"
                data-toggle="modal"
                data-target="#customerModal"
                >
                Add New
                <i class="fas fa-plus"></i>
              </button>
              <button type="button" class="btn btn-primary" @click="reload">
                Reload
                <i class="fas fa-sync"></i>
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="mb-3">
              <div class="row">
                <div class="col-md-2">
                  <strong>Search By :</strong>
                </div>
                <div class="col-md-3">
                  <select v-model="queryFiled" class="form-control" id="fileds">
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="address">Address</option>
                    <option value="total">Total</option>
                  </select>
                </div>
                <div class="col-md-7">
                  <input v-model="query" type="text" class="form-control" placeholder="Search">
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Langage</th>
                    <th scope="col">Phone</th>
                    <th scope="col" class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-show="customers.length"
                    v-for="(customer, index) in customers"
                    :key="customer.id"
                  >
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ customer.name}}</td>
                    <td>{{ customer.lastname }}</td>
                    <td>{{ customer.email }}</td>
                    <td>{{ customer.gender }}</td>
                    <td>{{ customer.language }}</td>
                    <td>{{ customer.phone_regular }}</td>

                    <td class="text-center">
                      <button type="button"
                       class="btn btn-info btn-sm">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button type="button"
                        @click="edit(customer)"
                        class="btn btn-primary btn-sm">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        type="button"
                        @click="destroy(customer)"
                        class="btn btn-danger btn-sm"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-show="!customers.length">
                    <td colspan="6">
                      <div class="alert alert-danger" role="alert">Sorry :( No data found.</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <pagination
                v-if="pagination.last_page > 1"
                :pagination="pagination"
                :offset="5"
                @paginate="query === '' ? getData() : searchData()"
              ></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->

    <div
      class="modal fade"
      id="showModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="showModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="showModalLabel"></h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <br>
            <br>
            <br>
            <strong>Address :</strong>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <sweet-modal icon="success" ref="successModal">
      Client Supprimé avec succes!!
    </sweet-modal>

    <sweet-modal icon="error" title="Echec" ref="errorModal">
      Une erreur s'est produite
    </sweet-modal>
  </div>
</template>

<script>
import Pagination from '../partial/PaginationComponent';
export default {
  components:{
    Pagination
  },
  data() {
    return {
      editMode: false,
      query: "",
      queryFiled: "name",
      customers: [],
     /* form: new Form({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        total: ""
      }),*/
      pagination: {
        current_page: 1
      }
    };
  },
  watch: {
    query: function(newQ, old) {
      if (newQ === "") {
        this.getData();
      } else {
        this.searchData();
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //this.$Progress.start();
      axios
        .get("customers/data-table?page=" + this.pagination.current_page)
        .then(response => {
          console.log(response.data.data)
          this.customers = response.data.data;
          this.pagination = response.data;
          //console;log(this.pagination.last_page)
          // this.$Progress.finish();
        })
        .catch(e => {
          console.log(e);
          // this.$Progress.fail();
        });
    },
    showCustomer(customer){
    $("#showModal").modal("show");

    },
    searchData() {
  //  this.$Progress.start();
      axios
        .get(
          "search/customers/" +
            this.queryFiled +
            "/" +
            this.query +
            "?page=" +
            this.pagination.current_page
        )
        .then(response => {
          this.customers = response.data.data;
          this.pagination = response.data.meta;
          // this.$Progress.finish();
        })
        .catch(e => {
          console.log(e);
          // this.$Progress.fail();
        });
    },
    reload() {
      this.getData();
      this.query = "";
      this.queryFiled = "name";
     // this.$snotify.success("Data Successfully Refresh", "Success");
    },
    /*
    create() {
      this.editMode = false;
      this.form.reset();
      this.form.clear();
      $("#customerModalLong").modal("show");
    }
    */
    store() {
    //  //// this.$Progress.start();
     // this.form.busy = true;
      //this.form
       // .post("/api/customers")
        //.then(response => {
          //this.getData();
         // $("#customerModalLong").modal("hide");
          //if (this.form.successful) {
          //  // this.$Progress.finish();
           //// this.$snotify.success("Customer Successfully Saved", "Success");
         // } else {
         //   // this.$Progress.fail();
        //   // this.$snotify.error(
          //    "Something went wrong try again later.",
            //  "Error"
            //);
         // }
        //})
        //.catch(e => {
         // // this.$Progress.fail();
         // console.log(e);
        //});
    },
//    show(customer) {
    //  this.form.reset();
      //this.form.fill(customer);
     // $("#showModal").modal("show");
  //    console.log(customer);
   // },
    edit(customer) {
      this.editMode = true;
      //this.form.reset();
      //this.form.clear();
      //this.form.fill(customer);
     // $("#customerModalLong").modal("show");
    },
    update() {
      //// this.$Progress.start();
      //this.form.busy = true;
      //this.form
       // .put("/api/customers/" + this.form.id)
      //  .then(response => {
       //   this.getData();
       //   $("#customerModalLong").modal("hide");
        //  if (this.form.successful) {
         //   // this.$Progress.finish();
         //  // this.$snotify.success("Customer Successfully Updated", "Success");
         // } else {
          //  // this.$Progress.fail();
           //// this.$snotify.error(
            //  "Something went wrong try again later.",
             // "Error"
            //);
         // }
        //})
       // //.catch(e => {
         // // this.$Progress.fail();
         // console.log(e);
       // });
    },
    destroy(customer) {
      let id=customer.id;
      console.log(id);
      swal({
        title: 'Etes vous sure?',
        text: "La suppression est irréversible",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        customClass: 'swal-overlay',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
        return axios.delete(`customers/${id}`)
          .then(response => {
              //console.log(response);
              return response;
              this.getData();
          })
          .catch(error => {
            swal.showValidationMessage( `Oops!! Operation de suppression echouée; erreur: ${error}` )
           this.getData();

          })
        },
          allowOutsideClick: () => !swal.isLoading()
          }).then((result) => {
        //  console.log(result)
          if (result.value){
            $('#customer').bootstrapTable('refresh')
            self.$refs.successModal.open()
        }
      });

    }
  },

};
</script>
