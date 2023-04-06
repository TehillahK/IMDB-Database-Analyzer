const OutputHero = (props: any) => {
  const result = props.result;
  const headers = result.length > 0 ? Object.keys(result[0]) : [];
  //console.log(headers);
  return (
    <div className="mt-4 flex justify-center">
      <div className="">
        <div className="">
          {result && (
            <div className="">
              <table className="table w-fit">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((item: any) => (
                    <tr key={item.id}>
                      {headers.map((header) => (
                        <td key={header}>{item[header]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputHero;
