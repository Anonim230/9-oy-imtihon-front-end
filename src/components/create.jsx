import { gql, useMutation } from '@apollo/client';
import React from 'react';

const Create = ({ required, set_required, add }) => {
    const [ mutate, { data } ] = useMutation(required.mutation || gql`mutation{ redactFood(id: 1 name: "Shaurma"  ) }`)
    console.log(data);
    required.mutate && mutate(required.mutate)
    required.name = required.name || ''
    required.forms = required.forms || []
    required.className = required.className || ''
    let list = []
    return (
        <form className={`card p-3 ${required.className} border-0 my-auto`} style={{boxSizing:'content-box'}} onSubmit={e =>  (add.current.selectedIndex = set_required({}) || 0) || (e.preventDefault() || required.onsubmit(e))}>
            <div className='card-title h3 d-flex justify-content-between'>{required.type || 'Create'} { required.name } <div onClick={() => add.current.selectedIndex = set_required({}) || 0} className='btn ml-3 btn-sm px-2 my-auto h-75 pt-0 btn-secondary'>x</div></div>
            {
                required.forms.map((v,i) => (
                (list = v.list || list ) &&
                <input type={v.type || 'text'} list={v.list ? `${required.name}_list` : ''} className='mb-3' name={v.name} key={i} placeholder={v.placeholder} required={Boolean(v.req || v.required === false ? false : true)} />
                ))
            }
            <datalist id={`${required.name}_list`}>
                {
                    list.map((v,i)=>(<option value={v.id} key={i}>{v.name}</option>))
                }
            </datalist>
            <input type="submit" value="Send" className="btn btn-primary" />
        </form>
    );
}

export default Create;
