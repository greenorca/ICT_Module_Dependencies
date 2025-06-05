export function exportDataToFile(data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'text/text' }); //new Blob([data], { type: 'text/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = "modules.json";
  link.click();
  URL.revokeObjectURL(url);
}

export function importFromFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function () {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const data = reader.result;
      localStorage.setItem('modules', data);
    };
    reader.readAsText(file);
  };
  input.click();
}

