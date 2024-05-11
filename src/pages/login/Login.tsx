import { useState, useEffect, FC } from 'react';
import { Button, Grid, TextField, Typography, CircularProgress } from "@mui/material";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import { usePostLoginMutation } from '../../stores/login/login';
import { ILogin } from '../../stores/login/interfaces/IloginResponse';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { BaseApiErrorResponse } from '../../stores/interfaces generales/Base_API_Error_Response';


const Login_Page: FC = () => {
    //PARA VALIDACIONES DEL FORM 
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<ILogin>();

    //PARA VALORES POR DEFECTO CUANDO INICIE LA PANTALLA
    const [query] = useState<ILogin>({
        User_Name: '',
        Password: ''
    });

    const [postLogin, { isLoading: isLoadingLogin, isSuccess, isError, error, reset: resetLogin, data },] = usePostLoginMutation();


    //ACCIONES QUE HACE AL REALIZAR LA PETICION DE LA API
    useEffect(() => {
        if (isSuccess) {
            //console.log(data);
            localStorage.setItem('loginData', JSON.stringify(data));
            reset();
            toast.success("Bienvenido!!");
            window.location.reload();
            
        }

        if (isError || error) {
            let errorMessage = 'Hubo un error al realizar la solicitud';
            
            if (error && 'data' in error && Array.isArray(error.data) && error.data.length > 0) {
                const errorResponse = error.data[0] as BaseApiErrorResponse;
                errorMessage = errorResponse.message;
            }

            toast.error(errorMessage.toString());
        }
        
    }, [isSuccess, reset, data, resetLogin, isError, error,]);

    //PARA ENVIAR DATOS AL API POST
    const onSubmit = (data: ILogin) => {
        const updatedRow = { ...query };
        //REVISA QUE NO QUEDEN ERRORES EN FORMULARIO
        if (Object.keys(errors).length === 0) {
            updatedRow.User_Name = data.User_Name;
            updatedRow.Password = data.Password;

            postLogin(updatedRow);
        }
    };

    return (
        <Grid>
                <Grid container>
                    <Grid item xs={12} md={6} >
                        <Grid container>
                            <Grid item xs={12} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'} >
                                <Typography
                                    variant="h3"
                                    color={'black'}
                                    textAlign='center'>
                                    Iniciar sesión
                                </Typography>

                                <Typography
                                    variant="subtitle2"
                                    component="h1"
                                    sx={{ marginTop: 2, }}
                                    fontWeight={400}
                                    color={'black'}
                                >
                                    Ingresa tu correo electrónico o número de empleado y tu contraseña para iniciar sesión.
                                </Typography>

                            </Grid>

                            <Grid item xs={12} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextField
                                        {...register("User_Name", {
                                            required: {
                                                value: true,
                                                message: "Usuario es requerido",
                                            },
                                        })}
                                        label="Correo o Numero de Empleado"
                                        defaultValue=""
                                        margin="normal"
                                        fullWidth
                                        error={errors.User_Name ? true : false}
                                        helperText={errors.User_Name ? errors.User_Name.message : ""}
                                    />
                                    <TextField
                                        {...register("Password", {
                                            required: {
                                                value: true,
                                                message: "Usuario es requerido",
                                            },
                                        })}
                                        label="Contraseña"
                                        type="password"
                                        defaultValue=""
                                        margin="normal"
                                        fullWidth
                                        error={errors.Password ? true : false}
                                        helperText={errors.Password ? errors.Password.message : ""}
                                    />

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        disabled={isLoadingLogin}
                                        startIcon={
                                            isLoadingLogin ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <LoginTwoToneIcon />
                                            )
                                        }
                                    >
                                        Iniciar Sesion
                                    </Button>

                                </form>
                                <Typography
                                    variant="subtitle1"
                                    component="h1"
                                    color='primary'
                                    style={{
                                        marginTop: 10,
                                        cursor: 'pointer'
                                    }}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    onClick={() => console.log('Olvidaste tu contraseña')}
                                >
                                    ¿Olvidaste tu contraseña?
                                </Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}
                        
                        justifyContent={'center'}
                        alignItems={'start'}
                        display={'flex'}
                        flexDirection={'column'}
                        padding={2}
                        sx={{ bgcolor: '#132d46' }}
                    >
                        <Typography
                            variant="h6"
                            component="h1"
                            style={{
                                color: "#ffffff",
                            }}
                        >
                            Sistema de gestión de Seguridad
                        </Typography>
                        <Typography
                            variant="h4"
                            component="h1"
                            style={{
                                color: "#ffffff",
                                fontWeight: "bold",
                            }}
                        >
                            Manager Security
                        </Typography>
                    </Grid>

                </Grid>

                </Grid>


    );
};

export default Login_Page;