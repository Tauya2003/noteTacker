document.addEventListener('DOMContentLoaded', () => {

    const addBtn = document.querySelector('.addBtn');
    const textarea = document.querySelector('#note');
    const errorMsg = document.querySelector('.error');
    const grid = document.querySelector('.grid');
    const overlay = document.querySelector('#overlay');

    // This function checks whether there are still notes avilable
    const noNotesAvailable = () => {
        if (grid.children.length === 0){
            document.querySelector('.noNotes').style.display = 'block';
        } else{
            document.querySelector('.noNotes').style.display = 'none';
        };
    };
    noNotesAvailable();

    // Adding a new note
    addBtn.addEventListener('click', () => {
        if (textarea.value === ''){
            errorMsg.style.display = 'block';
            setTimeout(() => {
                errorMsg.style.display = 'none';
                textarea.focus();
            }, 2000);
        } else{

            // Creating a new note
            
            const p = document.createElement('p');
            p.appendChild(document.createTextNode(textarea.value));

            const detailsBtn = document.createElement('button');
            detailsBtn.appendChild(document.createTextNode('View Details'));
            detailsBtn.className = 'view-details';

            const deleteBtn = document.createElement('button');
            deleteBtn.appendChild(document.createTextNode('X'));
            deleteBtn.className = 'delete';

            const item = document.createElement('div');
            item.className = 'item animate__animated animate__bounceIn';
            item.appendChild(p);
            item.appendChild(detailsBtn);
            item.appendChild(deleteBtn);

            grid.appendChild(item);

            textarea.value = '';
            textarea.focus();
            noNotesAvailable();

        };
    });


    // Deleting a note
    grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')){
            if (confirm('Are you sure you want to delete this note?')){
                e.target.parentElement.classList = 'item animate__animated animate__bounceOut'

                setTimeout(() => {
                    e.target.parentElement.remove();   
                    noNotesAvailable();
                }, 1000);
            };
        };
    });


    // Overlay hover effect
    overlay.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('fullNotes')){
            e.target.children[0].style.color = '#000';
            
        } else if (e.target.classList.contains('overlay')) {
            e.target.children[0].children[0].style.color = '#aaa';
        };
    });

    // Closing the overlay
    overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('closeBtn')){
            let a = e.target.parentElement.parentElement;
            a.classList = 'overlay animate__animated animate__zoomOut';

            setTimeout(() => {a.remove()}, 1000);

        } else if (e.target.classList.contains('overlay')){
            e.target.classList = 'overlay animate__animated animate__zoomOut'

            setTimeout(() => {e.target.remove()}, 1000);
        };
    });

    // Openung the overlay
    grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')){

            const btn = document.createElement('button');
            btn.appendChild(document.createTextNode('X'));
            btn.classList = 'closeBtn';

            const p = document.createElement('p');
            let text = e.target.parentElement.firstElementChild.textContent;
            p.appendChild(document.createTextNode(text));

            const div = document.createElement('div');
            div.classList = 'fullNotes';
            div.appendChild(btn);
            div.appendChild(p);

            const newOverlay = document.createElement('div');
            newOverlay.classList = 'overlay animate__animated animate__zoomIn'
            newOverlay.appendChild(div);

            overlay.appendChild(newOverlay);
        };

    });
});