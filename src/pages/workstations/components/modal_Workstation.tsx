import React, { useEffect, useState, FC } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, TextField, CircularProgress, Typography } from "@mui/material";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePostWorkstationMutation } from "../../../stores/users/workstationAPI";
import { IWorstationPost } from "../../../stores/users/interfaces/IWorkstation";
import { style_modal } from "../../../components_generals/style_modal";
import { BaseApiErrorResponse } from "../../../stores/interfaces generales/Base_API_Error_Response";

export const FormAddGeneral: FC<{
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSaveExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isModalOpen, setIsModalOpen, setIsSaveExist }) => {

  //PARA VALIDACIONES
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<IWorstationPost>();

  //LO QUE PASA CUANDO SE CIERRA EL MODAL
  const handleClose = () => { setIsModalOpen(false); reset(); };

  //API DE GUARDADO
  const [ registerCatalog, {isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister, reset: resetRegister, },] = usePostWorkstationMutation();

  //VALORES POR DEFECTO AL EMPEZAR
  const [selectedRow, setSelectedRow] = useState<IWorstationPost>({ name: "", });

  //LO QUE PASA CADA VEZ QUE GUARDO O ACTUALIZO
  useEffect(() => {

    if (isSuccessRegister) {
      toast.success("Se registro correctamente");
      reset();
      setIsModalOpen(false);
      setIsSaveExist(true);
    }

    if (isErrorRegister || errorRegister) {
      let errorMessage = 'Hubo un error al realizar la solicitud';

      if (errorRegister && 'data' in errorRegister && Array.isArray(errorRegister.data) && errorRegister.data.length > 0) {
        const errorResponse = errorRegister.data[0] as BaseApiErrorResponse;
        errorMessage = errorResponse.message;
      }

      toast.error(errorMessage.toString());
    }

  }, [
    isSuccessRegister,
    resetRegister,
    setIsModalOpen,
    setIsSaveExist,
    reset,
    isErrorRegister,
    errorRegister,
  ]);




  //PARA GUARDAR O ACTUALIZAR
  const onSubmit = async (data: IWorstationPost) => {
    const updatedRow = { ...selectedRow };

    //REVISA QUE NO QUEDEN ERRORES EN FORMULARIO
    if (Object.keys(errors).length === 0) {
      updatedRow.name = data.name;

      setSelectedRow(updatedRow);

      await registerCatalog(updatedRow);
    }
  };


  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container sx={{ ...style_modal }}>
            <Grid item xs={12}>
              <Typography align="center" variant="h4">
                Crear Puesto de Trabajo
              </Typography>
              <Grid container spacing={1} sx={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                  <TextField
                    {...register("name", {
                      required: { value: true, message: "Nombre es requerido" }
                    })}
                    id="Name"
                    className="responsive-textfield"
                    fullWidth
                    label="Name"
                    type="text"
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              sx={{ marginTop: "20px", justifyContent: "space-between" }}
            >
              <Grid item xs={5.8} sx={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoadingRegister}
                  startIcon={
                    isLoadingRegister ? (
                      <CircularProgress size={20} />
                    ) : (
                      <SaveAsTwoToneIcon />
                    )
                  }
                >
                  Guardar
                </Button>
              </Grid>
              <Grid item xs={5.8} sx={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};
