<template>
    <div class="card">
        <div class="card-header">
            <h4>Import Summary</h4>
        </div>
        <div class="card-body">
                <ul class="nav nav-pills" id="myTab3" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active show" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="true">Import Details</a>
                    </li>
                    <li class="nav-item" v-if="data.issues > 0">
                        <a class="nav-link" id="issues-tab" data-toggle="tab" href="#issues" role="tab" aria-controls="issues" aria-selected="false">Import Issues</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent2">
                    <div class="tab-pane fade active show" id="details" role="tabpanel" aria-labelledby="details-tab">
                        <section class="section">
                            <div class="section-body">
                                <h2 class="section-title text-dark">
                                    Import Details!!
                                </h2>
                                <div class="table-responsive">
                                    <table class="table table-bordered table-md">
                                        <tbody><tr>
                                            <th>Details</th>
                                            <th>#</th>
                                        </tr>
                                        <tr>
                                            <td><i class="fa fa-file fa-1x text-info"></i> &nbsp; File</td>
                                            <td>{{data.file}}</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fa fa-calendar fa-1x text-info"></i>&nbsp; Date</td>
                                            <td>{{data.date}}</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fa fa-clock fa-1x text-info"></i> &nbsp;Time</td>
                                            <td>{{data.time}}</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fa fa-check fa-1x text-success"></i> &nbsp;Successful</td>
                                            <td>{{data.successful}}</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fa fa-times fa-1x text-danger"></i> &nbsp;Issues</td>
                                            <td>{{data.issues}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="tab-pane fade" id="issues" role="tabpanel" aria-labelledby="issues-tab" v-if="data.issues > 0">
                        <section class="section"  >
                            <div class="section-body">
                                <h2 class="section-title text-dark">
                                    Issues!!
                                </h2>

                                <div id="accordion">
                                    <div class="accordion">
                                        <div v-for="(issue, index) in issues"
                                             class="accordion-header has-danger collapsed "
                                             :aria-expanded="index===0"
                                             role="button"
                                             data-toggle="collapse"
                                             :data-target="'#panel-body-'+index"
                                             aria-expanded="false"
                                        >
                                            <h4>{{issue}}</h4>
                                        </div>
                                        <div class="accordion-body collapse"
                                             :class="{'show': index===0}"
                                             v-for="(contents, index) in issueContents"
                                             :id="'panel-body-'+index"
                                             data-parent="#accordion"
                                        >
                                            <div class="table-responsive">
                                                <table class="table table-bordered table-hover table-danger table-md">
                                                    <tbody>
                                                    <tr class="bg-whitesmoke text--black bold">
                                                        <th>RowNumber</th>
                                                        <th>Column</th>
                                                        <th>Value</th>
                                                    </tr>

                                                    <tr v-for="c_issue in contents">
                                                        <td><span class="badge badge-transparent">{{c_issue.rowNumber}}</span></td>
                                                        <td>{{c_issue.column}}</td>
                                                        <td>{{c_issue.value}}</td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>



        </div>
    </div>
</template>

<script>
    export default {
        name: "ImportSummary",
        props:{
            data:{
                type: Object,
                default(){
                    return {}
                }
            }
        },
        computed: {
          issues() {
              return Object.keys(this.data.contentIssues)
          } ,
          issueContents(){
              return Object.values(this.data.contentIssues)
          }
        },
        mounted()
        {
            console.log(this.data)
        }
    }
</script>

<style scoped>
    .accordion .has-danger.accordion-header[aria-expanded="true"]{
        background-color: #bd2130;
    }
</style>