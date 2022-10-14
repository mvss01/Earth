function show_description(job_id){
    fetch('/jobs/api/'+job_id).then(req =>{
        return req.json()
    }).then(job_description =>{
        var html = '<button class="col-md-12" style="outline: none; border: 1px solid #dbdbdb; background: none; border-radius: 20px; padding: 20px;">'
        html += '<span><img src="/img/job-icon.png" width="50" height="41.18" style="float: left;"></span><br><br>'
        html += '<p class="text-left" >' 
        html += '<strong style="font-size: 20pt;">Vaga</strong><br>'
        html += '<span class="text-secondary" style="font-size: 15pt; font-weight: 500;">Empresa - Cidade, ES</span>'
        html += '</p>'
        html += '<span class="btn btn-primary text-white col-md-7 mt-3" style="text-decoration: none; float: left; ">Candidatar-se</span>'
        html += '<span class="btn btn-outline-secondary col-md-4 mt-3" style="text-decoration: none; float: right;">Salvar</span>'
        html += '</button>'
        html += '<div class="col-md-12 mt-3">'
        html += '<strong style="font-size: 13pt;">Descrição</strong><br>'
        html += 'Descrição da vaga, com os dados completos, to digitando so pra encher linguiça. Não tem o tal do lorem aqui n? Ah, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nostrum vero laboriosam corporis, dolor, laborum exercitationem mollitia optio necessitatibus beatae, similique provident blanditiis. Officia vero labore neque magnam optio laboriosam. Obrigado vs code'
        html += '<span class="mt-2" style="font-size: 13pt; float: left;">'
        html += '<strong>Nível de experiência</strong><br>'
        html += 'Pleno'
        html += '</span>'
        html += '<span class="col-md-6 col-sm-12 mt-2 collapse" id="" style="font-size: 13pt; float: right; ">'
        html += '<strong>Carga-horária</strong> <br>'
        html += 'Integral'
        html += '</span>'
        html += '</div>'
        
        
        jobDescription.innerHTML = html
    })
}

$("#job_btn").click(() =>{
    var job_id = $('#job_btn').val()
    show_description(job_id)
})
