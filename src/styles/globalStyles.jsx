export const flex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
};

export const btnStyle = {
  cursor: "pointer",
  "&:hover": { color: "red" },
};

export const modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
