window.onload = function(){
  var root = document.querySelector(':root'), keyC = '--primary-color',     valC = window.sessionStorage.getItem(keyC),
                                              keyBC = '--primary-bg-color', valBC = window.sessionStorage.getItem(keyBC);
  if(valC == null) {
      window.sessionStorage.setItem(keyC, root.style.getProperty('--primary-color'));
      window.sessionStorage.setItem(keyBC, root.style.getProperty('--primary-bg-color'));
  }
  alert(window.sessionStorage.getItem(valC))
  root.style.setProperty(keyC, valC);
  root.style.setProperty(keyBC, valBC);
};

$(document).ready(function () {
  const themeSwitchers = document.querySelectorAll('span');
  const dynamicInputs = document.querySelectorAll('input.input-color-picker');

  const handleThemeUpdate = (cssVars) => {
    const root = document.querySelector(':root');
    const keys = Object.keys(cssVars);

    keys.forEach(key => {
      root.style.setProperty(key, cssVars[key]);
      window.sessionStorage.setItem(key, cssVars[key]);
      alert(window.sessionStorage.getItem(key))
    });
  }
  
  themeSwitchers.forEach((item) => {
    item.addEventListener('click', (e) => {
      const bgColor = e.target.getAttribute('data-bg-color')
      const color = e.target.getAttribute('data-color')
      handleThemeUpdate({
        '--primary-bg-color': bgColor,
        '--primary-color': color
      });
      
      console.log(bgColor, color)
      $("input.input-color-picker[data-id='color']").val(color)
      $("input.input-color-picker[data-id='bg-color']").val(bgColor)
    });
  });
  
  dynamicInputs.forEach((item) => {
    item.addEventListener('input', (e) => {
      const cssPropName = `--primary-${e.target.getAttribute('data-id')}`;
      console.log(cssPropName)
      handleThemeUpdate({
        [cssPropName]: e.target.value
      });
    });
  });
});
