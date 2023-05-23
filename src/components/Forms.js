import { createData } from "brace-jsx";

let html = createData('<h1>Welcome</h1>')

const formData = createData({ interests: [], file: '' });
  let text = createData('')
export default function Form() {
  function handleSubmit(e) {
   html.set(JSON.stringify(formData()), null, 3)
  }
  
  function handleValues({ name, isChecked, value, target }) {

      if (typeof value === "string" && value.length > 10) {
        target.value = value.split('').splice(0,10).join('')
        return;
      }

    if (name === 'interests') {
      formData.update(prev => {
        if (isChecked) {
          return { ...prev, interests: [...prev.interests, value] };
        } else {
          const updatedInterests = prev.interests.filter(i => i !== value);
          return { ...prev, interests: updatedInterests };
        }
      });
    }
    else {
      formData.update(prev => ({
        ...prev,
        [name]: value.trim()
      }))
    }
  }
  
  

  return (
<main>
   <pre bind:html={html()} />
   <img loading="lazy" src={formData().file}/>
  <form submit$preventDefault$once$={handleSubmit}>
    <label>
      Name:
      <input type="text" name="name" bind:value={handleValues}
      autocorrect="false" max="3" autocomplete="false"/>
    </label>

    <label>
      Email:
      <input name="email" type="email" bind:value={handleValues} />
    </label>
    
    <label>
      File:
      <input name="file" type="file" bind:value={handleValues} />
    </label>

    <label>
      Password:
      <input name="password" type="password" bind:value={handleValues} />
    </label>

    <label>
      Gender:
      <select name="gender" bind:value={handleValues}>
        <option value="">-- Select Gender --</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </label>

    <label>
      Interests:
      <div>
        <label>
          <input name="interests" type="checkbox" bind:checked={handleValues} value="reading" />
          Reading
        </label>
        <label>
          <input name="interests" type="checkbox" bind:checked={handleValues} value="coding" />
          Coding
        </label>
        <label>
          <input name="interests" type="checkbox" bind:checked={handleValues} value="travelling" />
          Travelling
        </label>
      </div>
    </label>

    <label>
      Message:
      <textarea name="message" bind:value={handleValues}></textarea>
    </label>
    <button type="submit">Submit</button>
  </form>
</main>
    )
}



