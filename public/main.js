function show_description(job_id){
    fetch('/jobs/api/'+job_id).then(req =>{
        return req.json()
    }).then(job_description =>{
    var html = '<button class="col-md-12" style="outline: none; border: 1px solid #dbdbdb; background: none; border-radius: 20px; padding: 20px;">'
            html += '<span><img src="/img/job-icon.png" width="50" height="41.18" style="float: left;"></span><br><br>'
            html += '<p class="text-left" >' 
                html += '<strong style="font-size: 20pt;">' + job_description.jobName + '</strong><br>'
                html += '<span class="text-secondary" style="font-size: 15pt; font-weight: 500;">' + job_description.company + ' - ' + job_description.city + ', ' + job_description.state + '</span>'
            html += '</p>'
            html += '<span class="btn btn-primary text-white col-md-7 mt-3" style="text-decoration: none; float: left; ">Candidatar-se</span>'
            html += '<span class="btn btn-outline-secondary col-md-4 mt-3" style="text-decoration: none; float: right;">Salvar</span>'
        html += '</button>'
        html += '<div class="col-md-12 mt-3">'
             html += '<strong style="font-size: 13pt;">Descrição</strong><br>'
            html += '<div class="row col-12" style="font-size: 13pt;">'
                html += job_description.description
            html += '</div><br>'
        
            html += '<div class="row">'
                html += '<div class="col-6 ml-0 mr-0">'
                    html += '<strong>Nível de experiência</strong><br>'
                    html += job_description.target
                html += '</div>'
                html += '<div class="col-6">'
                    html += '<strong>Carga-horária</strong><br>'
                    html += job_description.workload
                html += '</div>'
            html += '</div><br>'
        
        html += '</div>'
        jobDescription.innerHTML = html
    })
}

$(".job_btn").click(btn =>{
    let content = btn.currentTarget
    //var status = $(content).hasClass('selected').toString()
    //if(status == "true"){
        //$('.job_btn').removeClass('selected')
        //jobDescription.innerHTML = null
    //}else{
        $(content).addClass('selected')
        var job_id = $(content).val()
        show_description(job_id)
    //}

})
