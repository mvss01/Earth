function show_description(job_id){
    fetch('/jobs/api/'+job_id).then(req =>{
        return req.json()
    }).then(informations =>{
        var opportunite = informations.opportunite
        var job_description = informations.job
        var session = informations.session
        var favorite = informations.favorite
    var html = '<button class="col-md-12" style="outline: none; border: 1px solid #dbdbdb; background: none; border-radius: 20px; padding: 20px;">'
            html += '<span><img src="/img/job-icon.png" width="50" height="41.18" style="float: left;"></span><br><br>'
            html += '<p class="text-left" >' 
                html += '<strong style="font-size: 20pt;">' + job_description.jobName + '</strong><br>'
                html += '<span class="text-secondary" style="font-size: 15pt; font-weight: 500;">' + job_description.company + ' - ' + job_description.city + ', ' + job_description.state + '</span>'
            html += '</p>'
            if(session){
                if(session.permission == "User"){
                    if(opportunite != null){
                        html += '<a href="/opportunities/register/' + job_description.jobId + '" class="btn btn-primary text-white col-md-7 mt-3" style="text-decoration: none; float: left; ">Inscrito</a>'
                    }else{
                        html += '<a href="/opportunities/register/' + job_description.jobId + '" class="btn btn-primary text-white col-md-7 mt-3" style="text-decoration: none; float: left; ">Candidatar-se</a>'
                    }
                    if(favorite != null){
                        html += '<a href="/favorites/register/' + job_description.jobId + '" class="btn btn-secondary col-md-4 mt-3" style="text-decoration: none; float: right;">Salvo</a>'
                    }else{
                        html += '<a href="/favorites/register/' + job_description.jobId + '" class="btn btn-outline-secondary col-md-4 mt-3" style="text-decoration: none; float: right;">Salvar</a>'
                    }
                    
                }else{
                    html += '<a href="/jobs/edit/' + job_description.jobId + '" class="btn btn-primary btn-block text-white col-md-12 mt-3" style="text-decoration: none; float: left;">Editar</a>'
                }
            }else{
                html += '<a href="/login" class="btn btn-primary text-white col-md-7 mt-3" style="text-decoration: none; float: left; ">Candidatar-se</a>'
                html += '<a href="/login" class="btn btn-outline-secondary col-md-4 mt-3" style="text-decoration: none; float: right;">Salvar</a>'
            }
            
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

function show_description_candidates(opportuniteId){
    fetch('opportunities/api/'+opportuniteId).then(req =>{
        return req.json()
    }).then(full_data =>{
        var opportunites = full_data
        var html = '<button class="col-md-12" style="outline: none; border: 1px solid #dbdbdb; background: none; border-radius: 20px; padding: 20px;">'
            html += '<span><img src="/img/job-icon.png" width="50" height="41.18" style="float: left;"></span><br><br>'
            html += '<p class="text-left" >' 
                html += '<strong style="font-size: 20pt;">' + opportunites.firstName + '</strong><br>'
                html += '<span class="text-secondary" style="font-size: 15pt; font-weight: 500;">' + opportunites.jobName + '</span>'
            html += '</p>'

            if(opportunites.status == "Analyze"){
                html += '<a href="/opportunities/edit/Pending/' + opportunites.id + '/' + opportunites.jobId + '" class="btn btn-primary text-white col-md-5 mt-3" style="text-decoration: none; float: left;">Criar Oportunidade</a>'
                html += '<a href="/opportunities/edit/Dismiss/' + opportunites.id + '/' + opportunites.jobId + '" class="btn btn-danger text-white col-md-5 mt-3" style="text-decoration: none; float: right;">Rejeitar</a>'
            }else{
                if(opportunites.status == "Pending"){
                    html += '<p class="text-primary col-md-12 mt-3" style="text-decoration: none; float: left;"><strong>Entre em contado com o candidato com os dados abaixo.</strong></p>'
                }else{
                    html += '<p class="text-primary col-md-12 mt-3" style="text-decoration: none; float: left;"><strong>Situação encerrada.</strong></a>'
                }
            }
                
            
            html += '</button>'
        html += '<div class="col-md-12 mt-3">'
             html += '<strong style="font-size: 13pt;">Descrição</strong><br>'
            html += '<div class="row col-12" style="font-size: 13pt;">'
                html += opportunites.userDescription
            html += '</div><br>'
            html += '<div class="row">'
                html += '<div class="col-6 ml-0 mr-0">'
                    html += '<strong>Email</strong><br>'
                    html += opportunites.userEmail
                html += '</div>'
                html += '<div class="col-6">'
                    html += '<strong>Telefone</strong><br>'
                    html += opportunites.telephone
                html += '</div>'
            html += '</div><br>'
        
        html += '</div>'
        userDescription.innerHTML = html 
    })
}

$(".candidate_btn").click(btn =>{
    let content = btn.currentTarget
    $(content).addClass('selected')
    var candidate_id = $(content).val()
    show_description_candidates(candidate_id)
})
