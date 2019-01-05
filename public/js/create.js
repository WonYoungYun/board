const textarea = document.querySelector('    .content .create_page .page_description textarea')

const cancel = document.querySelector('.content .create_page .btn_tab .cancel_btn')

function textareaHeight() {
    textarea.addEventListener('keyup', () => {
        textarea.style.height = "1px";
        textarea.style.height = (textarea.scrollHeight) + "px";
    })

}

function cancelConfirm() {
    cancel.addEventListener('click', () => {

        if (confirm("글 작성 중입니다. 정말 취소하시겠습니까?") != 0) {
            location.href = "/"
        } else {}
    })
}

document.addEventListener("DOMContentLoaded", () => {
    textareaHeight()
    cancelConfirm()
})