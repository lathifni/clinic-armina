"use client";
import { Profile } from "@/components/admin/Profile";
import { AuthProvider } from "@/context/AuthContext";
import { useCreateTable } from "@/features/admin/useCreateTable";
import { useDeleteTable } from "@/features/admin/useDeleteTable";
import { useEditTable } from "@/features/admin/useEditTables";
import { useFetchTables } from "@/features/admin/useFetchTables";
import {
  confirmDeleteAlert,
  showCreateAlert,
  showDeleteAlert,
  showEditeAlert,
  showErrorAlert,
} from "@/utils/AlertUtils";
import { useFormik } from "formik";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { baseUrl } from "@/lib/baseUrl";

interface TableRow {
  [key: string]: string | number | File | undefined;
}

const AdminTablePage = ({ params }: { params: { table: string } }) => {
  const { table } = params;
  const link = table.replaceAll("_", "-");
  const label = table.replaceAll("_", " ");
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState<TableRow>({});

  const { data, isLoading, refetch } = useFetchTables(link);
  const { mutate: create, isPending: createPending } = useCreateTable({
    link,
    onSuccess: () => {
      refetch();
      showCreateAlert(label);
    },
    onError: (error) => showErrorAlert("Creating " + label),
  });

  const { mutate: edit, isPending: editPending } = useEditTable({
    link,
    onSuccess: () => {
      refetch();
      showEditeAlert(label);
    },
    onError: (error) => showErrorAlert("Editing " + label),
  });

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteTable({
    link,
    onSuccess: () => {
      refetch();
      showDeleteAlert(label);
    },
    onError: (error) => showErrorAlert("Delete " + label),
  });

  useEffect(() => {
    if (isEditing && data?.length) {
      setInitialValues(data[0]);
    } else {
      setInitialValues({});
    }
  }, [data, isEditing]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      if (isEditing) {
        edit(formData);
      } else {
        create(formData);
      }
      formik.resetForm();
      setIsEditing(false);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    formik.setFieldValue("image", file);
  };

  const handleEdit = (row: TableRow) => {
    setIsEditing(true);
    formik.setValues(row);
  };

  const handleDelete = (row: TableRow) => {
    confirmDeleteAlert(label, row.id as string).then((result) => {
      if (result.isConfirmed) {
        deleteMutate(row.id as string);
      }
    });
  };

  return (
    <AuthProvider>
      <Profile />
      <h1 className="text-xl capitalize font-semibold mb-4">
        Manage {table.replaceAll("_", " ")}
      </h1>

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="mb-6 bg-white p-4 shadow rounded"
      >
{data &&
  Object.keys(data[0]).map((field) => (
    <div key={field} className="mb-4">
      <label className="block text-gray-700 mb-2 capitalize">
        {field.replaceAll("_", " ")}
      </label>
      <input
        name={field}
        onChange={field === "image" ? handleFileChange : formik.handleChange}
        className={`w-full border p-2 rounded ${
          field === "id" && "outline-none bg-slate-200 border-slate-400"
        }`}
        type={field === "image" ? "file" : "text"}
        {...(field !== "image" && { value: formik.values[field] || "" })}
        required={!(field === "image" && isEditing)}
        readOnly={field === "id"}
      />
    </div>
  ))}


        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="bg-white border w-full border-gray-200">
            <thead>
              <tr>
                {Object.keys(data?.[0] || {}).map((key) => (
                  <th
                    key={key}
                    className={`px-4 text-left capitalize py-2 border-b bg-gray-50 ${
                      (key === "image" || key === "layanan_id") && "text-center"
                    }`}
                  >
                    {key.replaceAll("_", " ")}
                  </th>
                ))}
                <th className="px-4 py-2 border-b bg-gray-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row: TableRow, index: number) => (
                <tr key={index} className="border-b">
                  {Object.keys(row).map((key) => (
                    <td
                      key={key}
                      className={`px-4 py-2 ${
                        key === "layanan_id" && "text-center"
                      } border-b text-ellipsis`}
                    >
                      {key === "image" && typeof row[key] === "string" ? (
                        <Image
                          src={baseUrl + row[key]}
                          className="size-40 mx-auto"
                          width={500}
                          height={500}
                          alt="image"
                        />
                      ) : typeof row[key] === "string" ||
                        typeof row[key] === "number" ? (
                        row[key]
                      ) : (
                        row[key] instanceof File && row[key].name
                      )}
                    </td>
                  ))}
                  <td className="px-2 py-2">
                    <div className="px-2 flex gap-2 justify-center items-center py-2">
                      <button
                        className="text-blue-500 border-2 rounded p-2 border-blue-500 flex items-center transition-ease-in-out hover:bg-blue-500 hover:text-white"
                        onClick={() => handleEdit(row)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 border-2 rounded p-2 border-red-500 flex items-center transition-ease-in-out hover:bg-red-500 hover:text-white"
                        onClick={() => handleDelete(row)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AuthProvider>
  );
};

export default AdminTablePage;
